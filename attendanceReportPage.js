function createMasterCheckbox() {
    const table = document.querySelector('.wykaz');
    const allInputs = [...table.querySelectorAll('input[type="checkbox"]')];
    if (allInputs.length === 0) return;

    let masterCheckbox = document.createElement("input");
    masterCheckbox.type = "checkbox";
    masterCheckbox.defaultChecked = false;
    masterCheckbox.id = "sl-masterCheckbox";
    masterCheckbox.style.marginLeft = "5px";
    masterCheckbox.addEventListener("change", event => {
        allInputs.forEach(i => i.checked = event.target.checked);
    });

    let masterLabel = document.createElement("label");
    masterLabel.htmlFor = masterCheckbox.id;
    masterLabel.append("Zaznacz wszystkie godziny");

    let masterToggleDiv = document.createElement("div");
    masterToggleDiv.style.textAlign = "center";
    masterToggleDiv.appendChild(masterLabel);
    masterToggleDiv.appendChild(masterCheckbox);
    table.parentElement.prepend(masterToggleDiv);
}

function createInputMapping() {
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
    return mapping;
}

function createDailyCheckboxes() {
    const table = document.querySelector('.wykaz');
    const tableHeader = table.querySelector('tr.naglowek');
    const weekdays = ['poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota', 'niedziela'];
    const weekdayCells = weekdays.map(weekday =>
        [...tableHeader.children].find(child =>
            child.textContent.toLowerCase().includes(weekday)
        )
    );
    const mapping = createInputMapping();
    weekdayCells.forEach((day, dayIdx) => {
        if (!day || mapping[dayIdx].every(arr => arr.length === 0)) return;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `sl-dayCheckbox-${dayIdx}`;
        checkbox.defaultChecked = false;
        checkbox.addEventListener("change", event => {
            mapping[dayIdx].forEach(arr => arr.map(el => el.checked = event.target.checked));
        });
        day.appendChild(checkbox);
    });
}

function createHourlyCheckboxes() {
    const mapping = createInputMapping();
    const table = document.querySelector(".wykaz");
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
    createHourlyCheckboxes();
    createDailyCheckboxes();
    createMasterCheckbox();
}

main();
