import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { InternationalizationService } from './core/services/internationalization/internationalization.service';
import { DrawerService } from './shared/components/drawer/drawer.service';
import { DrawerModel } from './shared/components/drawer/models/drawer';
import { environment } from '@all-knowledge/env/environment';
import { CountriesModel } from './core/models/countries.model';
import { CustomHttpEventObserverService } from './core/services/base-service/custom-http-event-observer.service';
import { TesteDrawerComponent } from './teste-drawer/teste-drawer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  sideOpened: boolean = true;
  isMobile: boolean = false;
  drawers: Array<DrawerModel>;
  drawersSubject: Subscription;
  countries: Array<CountriesModel>;
  countrySelected: CountriesModel;
  loading: boolean = false;

  constructor(
    private internationalizationService: InternationalizationService,
    private drawerService: DrawerService,
    private customHttpEventObserverService: CustomHttpEventObserverService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.internationalizationService.init();
    if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      this.isMobile = true;
    }
  }

  ngOnInit(): void {
    this.createObservableDrawers();
    this.setCountries();
    console.log(environment.ambiente);

    this.internationalizationService.onLangChange.subscribe((language) => {
      this.countrySelected = this.countries.filter((item) => item.codeLanguage === language)[0];
    });

    this.customHttpEventObserverService.beforeRequest.subscribe(() => {
      this.loading = true;
    });
    this.customHttpEventObserverService.afterRequest.subscribe(() => {
      this.loading = false;
    });
  }

  createObservableDrawers() {
    const drawerObs = this.drawerService.getDrawerObservables();
    if (drawerObs) {
      this.drawersSubject = drawerObs.subscribe(drawers => {
        this.drawers = drawers;
      });
    }
  }

  setCountries() {
    this.countries = new Array<CountriesModel>();
    this.countries.push(new CountriesModel(
      'brazil.svg',
      'pt-BR',
      'Brasil',
      'BR'
    ));
    this.countries.push(new CountriesModel(
      'USA.svg',
      'en',
      'Estados Unidos',
      'USA'
    ));
  }

  closeSidenav(sidenav) {
    if (this.isMobile) {
      sidenav.close();
    }
  }

  changeLanguage(country: CountriesModel) {
    this.countrySelected = country;
    this.internationalizationService.changeLanguage(country.codeLanguage);
  }

}
