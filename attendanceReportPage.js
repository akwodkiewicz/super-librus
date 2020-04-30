function isReady() {
    const secondOptionsPanel = document.querySelector("#opcje_seryjne_2");
    if (!secondOptionsPanel) {
        return false;
    }
    const wykaz = document.querySelector('.wykaz');
    const inputs = wykaz.querySelectorAll('input[type="checkbox"]');
    return inputs.length !== 0;
}

function createMasterCheckbox() {
    let masterCheckbox = document.createElement("input");
    masterCheckbox.type = "checkbox";
    masterCheckbox.defaultChecked = false;
    masterCheckbox.id = "sl-masterCheckbox";
    masterCheckbox.style.marginLeft = "5px";
    masterCheckbox.addEventListener("change", event => {
        const wykaz = document.querySelector('.wykaz');
        const inputs = [...wykaz.querySelectorAll('input[type="checkbox"]')];
        inputs.forEach(i => i.checked = event.target.checked);
    });

    let masterLabel = document.createElement("label");
    masterLabel.htmlFor = masterCheckbox.id;
    masterLabel.append("Zaznacz wszystkie godziny");

    let masterToggleDiv = document.createElement("div");
    masterToggleDiv.appendChild(masterLabel);
    masterToggleDiv.appendChild(masterCheckbox);
    document.querySelector("#opcje_seryjne_2").appendChild(masterToggleDiv);
}

function buildCheckbox(date) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = 'sl-' + date;
    checkbox.defaultChecked = false;
    const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    const dateCheckboxes = [...allCheckboxes].filter(c => c.value.includes(date));
    checkbox.addEventListener("change", event => {
        dateCheckboxes.forEach(d => d.checked = event.target.checked);
    });
    return checkbox;
}


function createDailyCheckboxes() {
    const table = document.querySelector('.wykaz');
    const row = document.createElement("tr");
    table.firstChild.appendChild(row);

    const leftPlaceholder = document.createElement("td");
    leftPlaceholder.colSpan = 2;
    row.appendChild(leftPlaceholder);

    const dateRegex = /\d{4}-\d{2}-\d{2}/;
    const weekdays = ['poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota', 'niedziela'];
    const tableHeader = table.querySelector('tr.naglowek');
    const weekdayHeaders = [...tableHeader.childNodes].filter(child =>
        weekdays.some(d => child.textContent.toLowerCase().includes(d))
    );

    for (const header of weekdayHeaders) {
        const date = dateRegex.exec(header.textContent);
        const checkbox = buildCheckbox(date);

        const label = document.createElement("label");
        label.htmlFor = checkbox.id;
        label.append("Wszystko poniżej");

        const div = document.createElement("div");
        div.style.display = "flex";
        div.style.justifyContent = "space-evenly";
        div.appendChild(label);
        div.appendChild(checkbox);

        const cell = document.createElement("td");
        cell.appendChild(div);

        row.appendChild(cell);
    }
    const rightPlaceholder = document.createElement("td");
    const wholeWidth = [...table.children[0].children[0].children].reduce(
        (acc, el) => {
            const colspan = el.getAttribute("colspan");
            const colspanAsNumber = Number(colspan);
            return (colspanAsNumber === 0) ? (acc + 1) : (acc + colspanAsNumber);
        }, 0);
    rightPlaceholder.colSpan = wholeWidth - (2 + weekdayHeaders.length);

    row.appendChild(rightPlaceholder);
}

function createHourlyCheckboxes() {
    const mapping = [];
    
    const table = document.querySelector(".wykaz");
    const studentRows = [...table.children[1].children];
    studentRows.forEach(student => {
        const days = [...student.children].filter(
            el => [...el.children].some(el2 => el2.nodeName === 'P')
        );
        days.forEach((day, dayIdx) => {
            [...day.children].forEach((hour, hourIdx) => {
                const input = hour.querySelector('input');
                if (mapping[dayIdx] === undefined) {
                    mapping[dayIdx] = [];
                }
                if (mapping[dayIdx][hourIdx] === undefined) {
                    mapping[dayIdx][hourIdx] = [];
                }
                if (input !== null) {
                    mapping[dayIdx][hourIdx].push(input);
                }
            })
        });
    });
    
    const hoursRow = table.querySelector("tr.bolded");
    const dayColumns = [...hoursRow.children].filter(c => c.children.length > 0);
    dayColumns.forEach((day, dayIdx) => {
        const hours = [...day.children].filter(el => el.nodeName === 'P');
        hours.forEach((hour, hourIdx) => {
            if (mapping[dayIdx][hourIdx].length === 0) return;

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = `sl-hourCheckbox-${dayIdx}-${hourIdx}`;
            checkbox.defaultChecked = false;
            checkbox.addEventListener("change", event => {
                mapping[dayIdx][hourIdx].forEach(d => d.checked = event.target.checked);
            });
            hour.append(checkbox);
        }); 
    });
}

function main() {
    if (false/*!isReady()*/) {
        return;
    }
    createMasterCheckbox();
    createDailyCheckboxes();
    createHourlyCheckboxes();
}

main();
