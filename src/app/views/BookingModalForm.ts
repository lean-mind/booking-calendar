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
     */
    btnSubmitForm: HTMLInputElement

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

        const formElementsObject: InputValue[] = [
            {name: 'name', value: null, type: 'text', element: 'input'},
            {name: 'email', value: null, type: 'text', element: 'input'},
            {name: 'description', value: null, type: null, element: 'textarea'},
            {name: 'btnSubmitForm', value: submit, type: 'submit', element: 'input'}
        ];
        const formElements = this.setInputs(formElementsObject);
        formElements.pop(); // Delete submit button from the array 
        const labelsElements = this.setLabels(['name', 'email', 'description']);

        // const warningLabel = document.createElement("p").innerHTML = warning;

        formElements.forEach((element, index) => {
            const div = document.createElement("div");
            div.appendChild(labelsElements[index]);
            div.appendChild(element);
            this.form.appendChild(div);
        });

        this.form.appendChild(this.btnSubmitForm);
        this.formContentContainer.appendChild(this.form);
    }

    /**
     * 
     * @param labels 
     * @returns 
     */
    setLabels(labels: string[]) {
        const result: HTMLElement[] = [];
        labels.forEach(labelName => {
            const label = document.createElement("label");
            label.innerHTML = (this as any)['lang'][labelName];
            result.push(label);
        });
        return result;
    }

    /**
     * 
     * @param inputs 
     * @returns 
     */
    setInputs(inputs: InputValue[]) {
        const result: HTMLElement[] = [];
        inputs.forEach(item => {
            const domElement = document.createElement(item.element);
            const input = (item.element === "input") 
            ? domElement as HTMLInputElement 
            : domElement as HTMLTextAreaElement;
            (item.element === "input") ? input.setAttribute("type", item.type) : null;
            (item.type === "submit") ? input.value = item.value : null;
            (this as any)[item.name] = input;
            result.push((this as any)[item.name])
        });
        return result;
    }
}

type InputValue = {
    name: string,
    type: string,
    value: string,
    element: string
}
