
export interface loginSubmitForm {
  email: string,
  password: string
}

export interface loginSubmitBody {
  url: string,
  body: loginSubmitForm
}


export interface registerSubmitForm extends loginSubmitForm  {
    name: string,
    password_confirmation: string
}

export interface registerSubmitBody {
    url: string,
    body: registerSubmitForm
}