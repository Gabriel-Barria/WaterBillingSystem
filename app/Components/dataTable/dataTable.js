// DataTable.js

class DataTable {
    constructor(tableBodyId) {
        this.tableBody = document.getElementById(tableBodyId);
    }

    populate(data) {
        this.clearTable();
        data.forEach(item => {
            const row = this.createRow(item);
            this.tableBody.appendChild(row);
        });
    }

    createRow(item) {
        const row = document.createElement('tr');
        Object.values(item).forEach(value => {
            const cell = document.createElement('td');
            cell.textContent = value;
            row.appendChild(cell);
        });
        return row;
    }

    clearTable() {
        this.tableBody.innerHTML = '';
    }
}

export default DataTable;
