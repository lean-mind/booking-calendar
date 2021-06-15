import { FormModal } from '../interfaces/FormModal';
import { lang as langForm } from '../lang/form';
import { Language } from '../pipes/Language';


export class BookingModalForm {
    /**
     * Modal form
     */
    modal: HTMLElement;

    /**
     * Modal form header
     */
    formHeaderContainer: HTMLElement;

    /**
     * Modal form content
     */
    formContentContainer: HTMLElement;

    /**
     * Close button modal
     */
    closeModal: HTMLElement;

    /**
     * 
     */
    name: HTMLInputElement;

    /**
     * 
     */
    email: HTMLInputElement;

    /**
     * 
     */
    description: HTMLTextAreaElement;

    /**
     * 
     */
    form: HTMLFormElement;

    /**
     * 
     * 
     */
    lang: FormModal;

    constructor(lang: Language) {
        this.lang = langForm[lang] as FormModal;
        this.modal = document.getElementById("myModal") as HTMLElement;
        this.closeModal = document.getElementsByClassName("close")[0] as HTMLElement;
        this.formHeaderContainer = document.getElementsByClassName("modal-header")[0] as HTMLElement;
        this.formContentContainer = document.getElementsByClassName("modal-content")[0] as HTMLElement;
    }

    init() {
        this.closeModal.addEventListener("click", () =>
            this.hide()
        );
        this.createFormHeader();
        this.createContent();
    }

    show() {
        this.modal.style.display = "block";
    }

    hide() {
        this.modal.style.display = "none";
    }

    createFormHeader() {
        const h3 = document.createElement("h3");
        h3.innerHTML = "Has seleccionado una hora"
        this.formHeaderContainer.appendChild(h3);
    }

    createContent() {
        const { submit, warning } = this.lang;
        this.form = document.createElement("form");
        this.name = document.createElement("input");
        this.name.setAttribute("type", "text"); 
        this.email = document.createElement("input");
        this.email.setAttribute("type", "text");
        this.description = document.createElement("textarea");
        const btnSubmit = document.createElement("input");
        btnSubmit.setAttribute("type", "submit");
        btnSubmit.setAttribute("value", submit);
        const warningLabel = document.createElement("p").innerHTML = warning;
        const formElements = [this.name, this.email, this.description];
        const labelsElements = this.setLabels(['name', 'email', 'description']);

        formElements.forEach((element, index) => {
            const div = document.createElement("div");
            div.appendChild(labelsElements[index]);
            div.appendChild(element);
            this.form.appendChild(div);
        });

        this.form.appendChild(btnSubmit); 
        this.formContentContainer.appendChild(this.form);
    }

    setLabels(labels: string[]){
        const result: HTMLElement[] = [];
        labels.forEach(labelName=>{
            const label = document.createElement("label");
            label.innerHTML = (this as any)['lang'][labelName];
            result.push(label);
        });
        return result;
    }
}
