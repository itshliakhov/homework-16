function FormValidate(form) {
    const _parentItemClass = "form-control";
    const _errorWrapperClass = "error";
    const _errorItemClass = "error__item";
    const _elements = form.elements;
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        this.checkFormElement();
    })
    this.checkFormElement = function () {
        for (let i = 0; i < _elements.length; i++) {
            const element = _elements[i];
            const passwordMessage = element.dataset.password;
            if (passwordMessage) {
                this.validPassword(element,passwordMessage);
            }
            const emailMessage = element.dataset.email;
            if (emailMessage) {
                this.validEmail(element,emailMessage);
            }
            const nameRequired = element.dataset.reqname;
            if(nameRequired) {
                this.checkRequiredName(element,nameRequired);
            }
            const emailRequired = element.dataset.reqemail;
            if(emailRequired) {
                this.checkRequiredEmail(element,emailRequired);
            }
            const passwordRequired = element.dataset.reqpassword;
            if(passwordRequired) {
                this.checkRequiredPassword(element,passwordRequired);
            }
            const checkBoxRequired = element.dataset.reqcheckbox;
            if(checkBoxRequired) {
                this.checkRequiredCheckBox(element,checkBoxRequired);
            }
            const userNameMinLength = element.dataset.minname_length;
            const userNameLengthMessage = element.dataset.minname_message;
            if(userNameLengthMessage) {
                this.checkNameLength(element,userNameLengthMessage.replace("N", userNameMinLength));
            }
            const passwordMinLength = element.dataset.minpass_length;
            const passwordLengthMessage = element.dataset.minpass_message;
            if(passwordLengthMessage) {
               this.checkPasswordLength(element,passwordLengthMessage.replace("N", passwordMinLength));
            }
        }
    }
    this.findInputElement = function(inputWithAttribute) {
        const inputElement = form.querySelectorAll(inputWithAttribute);
        this.valueArray = Array.from(inputElement).map(el => el.value);
    }
    this.validPassword = function (item,message) {
        this.findInputElement("input[type=password]");
        if (this.valueArray[0] !== this.valueArray[1]) {
            this.errorTemplate(item, message);
        }
    }
    this.validEmail = function (item,message) {
        this.findInputElement("input[name=email]");
        const email_regExp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!this.valueArray[0].match(email_regExp)  && this.valueArray[0] !== "") {
           this.errorTemplate(item, message);
        }
    }
    this.checkRequiredName = function (item,message) {
        this.findInputElement("input[name=username]");
        if(this.valueArray[0] === ""){
            this.errorTemplate(item,message);
        }
    }
    this.checkRequiredEmail = function (item,message) {
        this.findInputElement("input[name=email]");
        if(this.valueArray[0] === ""){
           this.errorTemplate(item,message);
        }
    }
    this.checkRequiredPassword = function (item,message) {
        this.findInputElement("input[type=password]");
        if(this.valueArray[0] === "" && this.valueArray[1] === ""){
          this.errorTemplate(item,message);
        }
    }
    this.checkRequiredCheckBox = function (item,message) {
        const inputElement = form.querySelectorAll("input[type=checkbox]");
        this.valueArray = Array.from(inputElement).map(el => el.checked);
        if(this.valueArray[0] === false){
            this.errorTemplate(item,message);
        }
    }
    this.checkNameLength = function (item,message) {
        this.findInputElement("input[name='username']");
        if(this.valueArray[0].length < 2 && this.valueArray[0] !== "") {
            this.errorTemplate(item,message);
        }
    }
    this.checkPasswordLength = function (item,message) {
        this.findInputElement("input[type='password']");
        if(this.valueArray[0].length < 5 && this.valueArray[1].length <5 && this.valueArray[0] === this.valueArray[1]) {
            this.errorTemplate(item,message);
        }
    }
    this.errorTemplate = function (element, message) {
        const parent = element.closest(`.${_parentItemClass}`);
        if (!parent.classList.contains(_errorWrapperClass)) {
            parent.classList.add(_errorWrapperClass);
            parent.insertAdjacentHTML("beforeend", `<small class="${_errorItemClass}">${message}</small>`);
        }
    }
}

const form = new FormValidate(document.querySelector("#form"));
