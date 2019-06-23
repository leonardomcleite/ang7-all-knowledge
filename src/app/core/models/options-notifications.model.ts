export type TypesNotification = 'success' |'warning' | 'error' | 'information';

export class OptionsNotification {
  title: string;
  message: any;
  type: TypesNotification;
  actionLabel?: string;
  showAction: boolean;
  verticalPosition: 'top' | 'bottom';
  horizontalPosition: 'start' | 'center' | 'end' | 'left' | 'right';
  time?: number;
  callbackAction?: Function;
  error?: any;

  /**
   * Opções para notificação
   * @param title - Titilo da notificação
   * @param message - Mensagem a ser mostrada, aceita tanto uma string simples, como um código HTML lembrando que deve estar entre duas crases
   * @param type - tipo de mensagem, sucesso, alerta, erro, informação
   * @param action - botão de ação, aceita tanto uma string simples, como um código HTML lembrando que deve estar entre duas crases
   * @param verticalPosition - posicao vertical da notificaçao: parte superior ou inferior da tela
   * @param horizontalPosition - posicao horizontal da notificaçao: começo, meio ou fim
   * @param time - tempo que a notificação ficará aberta
   * @param error - httpError
   * @param actionLabel - texto do botão de acão
   */
  constructor(title?: string, message?: any, type?: any, actionLabel?: string, showAction?: boolean, verticalPosition?: any, horizontalPosition?: any, time?: number, callbackAction?: Function, error?: any) {
    this.title = title;
    this.message = message;
    this.type = type;
    this.showAction = showAction;
    this.verticalPosition = verticalPosition;
    this.horizontalPosition = horizontalPosition;
    this.time = time;
    this.callbackAction = callbackAction;
    this.error = error;
    this.actionLabel = actionLabel;
  }
}
