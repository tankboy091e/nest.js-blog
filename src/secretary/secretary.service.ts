import { Injectable, Scope, Logger } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class Secretary extends Logger {
  public override log(message: any): void {
    console.log(`${message} ${this.context} at ${this.getTimestamp()}`);
  }
}
