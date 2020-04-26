function isReady() {
    const secondOptionsPanel = document.querySelector("#opcje_seryjne_2");
    if (!secondOptionsPanel) {
        return false;
    }
    const wykaz = document.querySelector('.wykaz');
    const inputs = wykaz.querySelectorAll('input[type="checkbox"]');
    return inputs.length !== 0;
}

function toggleAllCheckboxes() {
    const wykaz = document.querySelector('.wykaz');
    const inputs = wykaz.querySelectorAll('input[type="checkbox"]');
    for (const input of inputs) {
        input.checked = !input.checked;
    }
}

function main() {
    if (!isReady()) {
        return;
    }

    let masterCheckbox = document.createElement("input");
    masterCheckbox.type = "checkbox";
    masterCheckbox.defaultChecked = false;
    masterCheckbox.addEventListener("change", toggleAllCheckboxes);
    masterCheckbox.id = "la-masterCheckbox";
    masterCheckbox.style.cssText = "margin-left: 5px;";

    let superLibrus = document.createElement("span");
    superLibrus.innerHTML = "SuperLibrus: ";
    superLibrus.style = "font-weight: 600";

    let masterLabel = document.createElement("label");
    masterLabel.htmlFor = masterCheckbox.id;
    masterLabel.append(superLibrus, "Zaznacz wszystko");

    let masterToggleDiv = document.createElement("div");
    masterToggleDiv.appendChild(masterLabel);
    masterToggleDiv.appendChild(masterCheckbox);
    document.querySelector("#opcje_seryjne_2").appendChild(masterToggleDiv);
}

main();
