type SystemErrorTypes = 'alr-opn' | 'unk-ress'

type typeToMessageType = {
    [key in SystemErrorTypes]: string;
};
const typeToMessage: typeToMessageType = {
    "alr-opn": "This project is already open and does not allow multiple windows",
    "unk-ress": "Unknown ressource"
}

export default class SystemError extends Error { 
    details: any
    constructor(type: SystemErrorTypes, details?: any) {
      super(typeToMessage[type]);
      this.details = details;
    }
}