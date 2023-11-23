export default function handleExamData(data){
    // Create an empty object to store the sorted data
    let sortedData = {};

    // Loop through each item in the data array
    data.forEach(item => {
        // If the year does not exist in the sortedData object, add it
        if (!sortedData[item.year]) {
            sortedData[item.year] = {
                student_number: item.student_number,
                semesters: {}
            };
        }

        // If the semester does not exist in the year, add it
        if (!sortedData[item.year].semesters[item.semester]) {
            sortedData[item.year].semesters[item.semester] = {};
        }

        // If the module does not exist in the semester, add it
        if (!sortedData[item.year].semesters[item.semester][item.module_code]) {
            sortedData[item.year].semesters[item.semester][item.module_code] = [];
        }

        // Add the module data to the module array
        sortedData[item.year].semesters[item.semester][item.module_code].push({
            id: item.id,
            type: item.type,
            result: item.result,
            mark_percentage: item.mark_percentage,
            created_at: item.created_at
        });
    });

    // Return the sorted data
    return sortedData;
}
