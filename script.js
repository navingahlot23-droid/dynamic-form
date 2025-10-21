let contentbox = document.querySelector('.content-box');
let item = document.querySelector('#selectItem');
let btn = document.querySelector('#addBtn');

let fieldcount = 0;

btn.addEventListener('click', () => {
    let selectedType = item.value;
    let placeholderText = selectedType.charAt(0).toUpperCase() + selectedType.slice(1);

    const wrapper = document.createElement('div');
    wrapper.className = 'field-wrapper';

    if (
        ['text', 'number', 'email', 'radio', 'select', 'checkbox'].includes(selectedType)
    ) {
        fieldcount++;
        const fieldId = `field-${fieldcount}`;
        wrapper.id = fieldId;

        // Label field
        let divField = document.createElement('div');
        divField.className = 'fields';

        let input = document.createElement('input');
        input.type = 'text';
        input.name = 'text';
        input.className = 'input';
        input.placeholder = 'Label';

        let button = document.createElement('button');
        button.className = 'btn-primary';
        button.textContent = 'Add';

        button.addEventListener('click', () => {
            let label = document.createElement('p');
            label.className = 'label';
            label.textContent =
                input.value.charAt(0).toUpperCase() +
                input.value.slice(1).toLowerCase() +
                ':-';
            divField.appendChild(label);
            input.remove();
            button.remove();
        });

        divField.appendChild(input);
        divField.appendChild(button);
        wrapper.appendChild(divField);

        // ----- TEXT, NUMBER, EMAIL -----
        if (['text', 'number', 'email'].includes(selectedType)) {
            let input2 = document.createElement('input');
            input2.type = selectedType;
            input2.name = `${selectedType}-${fieldcount}`;
            input2.id = `${selectedType}-${fieldcount}`;
            input2.className = 'inputField';
            input2.placeholder = placeholderText;
            wrapper.appendChild(input2);
        }

        // ----- RADIO -----
        else if (selectedType === 'radio') {
            let divField = document.createElement('div');
            divField.className = 'fields';

            let input = document.createElement('input');
            input.type = 'text';
            input.className = 'input';
            input.placeholder = 'Enter Option Text';

            let button = document.createElement('button');
            button.className = 'btn-primary';
            button.textContent = 'Add';

            let radioDivWrapper = document.createElement('div');
            radioDivWrapper.className = 'radio-wrapper';

            let radioDiv = document.createElement('div');
            radioDiv.className = 'radio-div';

            button.addEventListener('click', () => {
                if (!input.value.trim()) return;

                const optionId = `${input.value.replace(/\s+/g, "_").toLowerCase()}_${fieldcount}`;

                let radioList = document.createElement('input');
                radioList.type = 'radio';
                radioList.id = optionId;
                radioList.name = `radio-${fieldcount}`;
                radioList.value = input.value;

                let radioLabel = document.createElement('label');
                radioLabel.setAttribute('for', optionId);
                radioLabel.textContent =
                    input.value.charAt(0).toUpperCase() + input.value.slice(1).toLowerCase();

                let optionWrap = document.createElement('div');
                optionWrap.className = 'radio-option';
                optionWrap.appendChild(radioList);
                optionWrap.appendChild(radioLabel);

                radioDiv.appendChild(optionWrap);
                input.value = '';
            });

            divField.appendChild(input);
            divField.appendChild(button);
            radioDivWrapper.appendChild(divField);
            radioDivWrapper.appendChild(radioDiv);
            wrapper.appendChild(radioDivWrapper);
        }

        // ----- CHECKBOX -----
        else if (selectedType === 'checkbox') {
            let divField = document.createElement('div');
            divField.className = 'fields';

            let input = document.createElement('input');
            input.type = 'text';
            input.className = 'input';
            input.placeholder = 'Enter Option Text';

            let button = document.createElement('button');
            button.className = 'btn-primary';
            button.textContent = 'Add';

            let checkboxDivWrapper = document.createElement('div');
            checkboxDivWrapper.className = 'checkbox-wrapper';

            document.querySelectorAll('.radio-wrapper .fields').forEach(el => el.remove());

            button.addEventListener('click', () => {
                if (!input.value.trim()) return;

                const optionId = `${input.value.replace(/\s+/g, "_").toLowerCase()}_${fieldcount}`;

                let checkboxList = document.createElement('input');
                checkboxList.type = 'checkbox';
                checkboxList.id = optionId;
                checkboxList.name = `checkbox-${fieldcount}`;
                checkboxList.value = input.value;

                let checkboxLabel = document.createElement('label');
                checkboxLabel.setAttribute('for', optionId);
                checkboxLabel.textContent =
                    input.value.charAt(0).toUpperCase() + input.value.slice(1).toLowerCase();

                let checkDiv = document.createElement('div');
                checkDiv.className = 'check-div';
                checkDiv.appendChild(checkboxList);
                checkDiv.appendChild(checkboxLabel);

                checkboxDivWrapper.appendChild(checkDiv);
                input.value = '';
            });

            divField.appendChild(input);
            divField.appendChild(button);
            checkboxDivWrapper.appendChild(divField);
            wrapper.appendChild(checkboxDivWrapper);
        }

        // ----- SELECT -----
        else if (selectedType === 'select') {
            let divField = document.createElement('div');
            divField.className = 'fields';

            let input = document.createElement('input');
            input.type = 'text';
            input.className = 'input';
            input.placeholder = 'Enter Option Text';

            let button = document.createElement('button');
            button.className = 'btn-primary';
            button.textContent = 'Add';

            let selectDivWrapper = document.createElement('div');
            selectDivWrapper.className = 'select-wrapper';

            let selectList = document.createElement('select');
            selectList.id = `select-${fieldcount}`;
            selectList.name = `select-${fieldcount}`;

            document.querySelectorAll('.checkbox-wrapper .fields').forEach(el => el.remove());

            button.addEventListener('click', () => {
                if (!input.value.trim()) return;
                let selectOption = document.createElement('option');
                selectOption.value = input.value;
                selectOption.textContent =
                    input.value.charAt(0).toUpperCase() + input.value.slice(1).toLowerCase();
                selectList.appendChild(selectOption);
                input.value = '';
            });

            let selectDiv = document.createElement('div');
            selectDiv.className = 'select-div';
            selectDiv.appendChild(selectList);

            selectDivWrapper.appendChild(divField);
            selectDivWrapper.appendChild(selectDiv);
            divField.appendChild(input);
            divField.appendChild(button);

            wrapper.appendChild(selectDivWrapper);
        }

        // Cancel button
        let CBtn = document.createElement('p');
        CBtn.className = 'cancel';
        CBtn.textContent = '⨯';
        CBtn.addEventListener('click', () => {
            document.getElementById(fieldId)?.remove();
        });
        wrapper.appendChild(CBtn);
    }

    // ----- SUBMIT -----
    else if (selectedType === 'submit') {
        if (confirm('Is your form complete?')) {
            document.querySelectorAll('.select-wrapper .fields').forEach(el => el.remove());
            document.querySelectorAll('.cancel').forEach(el => el.remove());
            document.querySelectorAll('.field-wrapper').forEach(el => (el.style.justifyContent = 'space-around'));

            const submitButton = document.createElement('button');
            submitButton.id = 'submitButton';
            submitButton.className = 'btn-primary';
            submitButton.textContent = 'Submit';

            submitButton.addEventListener('click', renderForm);
            wrapper.appendChild(submitButton);
            wrapper.classList.add('submit-btn');
        }
    }

    contentbox.appendChild(wrapper);
});

// -------------------------
// Render form after clicking submit
// -------------------------

function renderForm(e) {
    const submitButton = e.target;

    submitButton.disabled = true;
    submitButton.style.opacity = '.5';
    submitButton.style.pointerEvents = 'none';

    // Unique identifier for this cloned form
    const uniqueId = Date.now();

    const formWrapper = document.createElement('div');
    formWrapper.className = 'form-wrapper';
    formWrapper.id = `form_${uniqueId}`;
    document.querySelector('.body-container').appendChild(formWrapper);

    // Clone the original form
    const clonedForm = contentbox.cloneNode(true);
    formWrapper.appendChild(clonedForm);

    formWrapper.querySelectorAll('[id]').forEach((el) => {
        const oldId = el.id;
        const newId = `${oldId}_${uniqueId}`;
        el.id = newId;

        const labels = formWrapper.querySelectorAll(`label[for="${oldId}"]`);
        labels.forEach(label => label.setAttribute('for', newId));
    });

    formWrapper.querySelectorAll('input[type="radio"]').forEach((radio) => {
        radio.name = `${radio.name}_${uniqueId}`;
    });

    formWrapper.querySelectorAll('input').forEach((field) => {
        if (field.type === 'checkbox' || field.type === 'radio') {
            field.checked = false;
        } else {
            field.value = '';
        }
    });

    const clonedSubmitButton = formWrapper.querySelector('button.btn-primary');
    if (clonedSubmitButton) {
        clonedSubmitButton.disabled = false;
        clonedSubmitButton.style.opacity = '1';
        clonedSubmitButton.style.pointerEvents = 'auto';

        clonedSubmitButton.addEventListener('click', submitForm);
    }
}


// -------------------------
// Collect values after submission
// -------------------------

function submitForm(e) {
    e.preventDefault();
    const formWrapper = e.target.closest('.form-wrapper');

    const infoWrap = document.createElement('div');
    infoWrap.className = 'info-wrap';

    const allFields = formWrapper.querySelectorAll('.field-wrapper');

    allFields.forEach(field => {
        const label = field.querySelector('.label')?.textContent || '';
        const fieldBox = document.createElement('div');
        fieldBox.className = 'field-box';

        // --- TEXT, EMAIL, NUMBER ---
        const inputField = field.querySelector('.inputField');
        if (inputField) {

            if (inputField.type !== "email" && inputField.value) {
                inputField.value =
                    inputField.value.charAt(0).toUpperCase() +
                    inputField.value.slice(1).toLowerCase();
            }

            const p = document.createElement('p');
            p.textContent = `${label} ${inputField.value || '-'}`;
            fieldBox.appendChild(p);
        }

        // --- RADIO ---
        const radioChecked = field.querySelector('input[type="radio"]:checked');
        if (radioChecked) {
            const capitalizedValue =
                radioChecked.value.charAt(0).toUpperCase() +
                radioChecked.value.slice(1).toLowerCase();

            const p = document.createElement('p');
            p.textContent = `${label} ${capitalizedValue}`;
            fieldBox.appendChild(p);
        }

        // --- CHECKBOX ---
        const checkboxes = field.querySelectorAll('input[type="checkbox"]:checked');
        if (checkboxes.length > 0) {
            const values = Array.from(checkboxes)
                .map(c => c.value.charAt(0).toUpperCase() + c.value.slice(1).toLowerCase())
                .join(', ');

            const p = document.createElement('p');
            p.textContent = `${label} ${values}`;
            fieldBox.appendChild(p);
        }

        // --- SELECT ---
        const select = field.querySelector('select');
        if (select) {
            const selectedValue = select.value
                ? select.value.charAt(0).toUpperCase() + select.value.slice(1).toLowerCase()
                : '-';

            const p = document.createElement('p');
            p.textContent = `${label} ${selectedValue}`;
            fieldBox.appendChild(p);
        }


        if (fieldBox.children.length > 0) {
            infoWrap.appendChild(fieldBox);
        }
    });

    formWrapper.appendChild(infoWrap);
}
