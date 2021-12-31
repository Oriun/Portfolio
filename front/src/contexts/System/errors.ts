type SystemErrorTypes = 'alr-opn'

type typeToMessageType = {
    [key in SystemErrorTypes]: string;
};
const typeToMessage: typeToMessageType = {
    "alr-opn": "This project is already open and does not allow multiple windows"
}

export default class SystemError extends Error { 
    details: any
    constructor(type: SystemErrorTypes, details?: any) {
      super(typeToMessage[type]);
      this.details = details;
    }
}