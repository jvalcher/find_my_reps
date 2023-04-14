
// get form data
export function getFormData() {

    const dataLabels = ["address", "city", "state", "zip"];
    let data = {};

    // store form values
    for (let i = 0; i < 4; i++) {
        data[dataLabels[i]] = document.getElementById(dataLabels[i]).value;
    }

    return data;
}
