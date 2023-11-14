export default function processAcademicData(data){

    /*
    - semester [int] (1 or 2)
    - year [int]
    - moduleCode [text]
    - type [text] (Either assignment_1, assignment_2, assignment_3, cs_test, supplementary_exam or exam)
    - result [text] (Either pass or fail)
    - markPercentage [int]
    - studentNumber [int] (ALWAYS 9 digits)
    */

    /*
    -------------------------------------------------------------
    OBJECT
    -------------------------------------------------------------
    */

    // Initialize an empty array to store the processed data
    const processedData = data.reduce((acc, curr) => {
        // Destructure the current item
        const { module_code, year, semester, type, mark_percentage } = curr;
        // Find the index of the current module in the accumulator
        const moduleIndex = acc.findIndex(module => module.module_code === module_code);

        // If the module is not found in the accumulator
        if (moduleIndex === -1) {
            // Push a new module object into the accumulator
            acc.push({
                module_code,
                years: [{
                    year,
                    semesters: [{
                        semester,
                        marks: [{
                            type,
                            mark_percentage
                        }]
                    }]
                }]
            });
        } else {
            // If the module is found, find the index of the current year
            const yearIndex = acc[moduleIndex].years.findIndex(y => y.year === year);

            // If the year is not found
            if (yearIndex === -1) {
                // Push a new year object into the module
                acc[moduleIndex].years.push({
                    year,
                    semesters: [{
                        semester,
                        marks: [{
                            type,
                            mark_percentage
                        }]
                    }]
                });
            } else {
                // If the year is found, find the index of the current semester
                const semesterIndex = acc[moduleIndex].years[yearIndex].semesters.findIndex(s => s.semester === semester);

                // If the semester is not found
                if (semesterIndex === -1) {
                    // Push a new semester object into the year
                    acc[moduleIndex].years[yearIndex].semesters.push({
                        semester,
                        marks: [{
                            type,
                            mark_percentage
                        }]
                    });
                } else {
                    // If the semester is found, push the mark into the semester
                    acc[moduleIndex].years[yearIndex].semesters[semesterIndex].marks.push({
                        type,
                        mark_percentage
                    });
                }
            }
        }

        // Return the accumulator for the next iteration
        return acc;
    }, []);

    // Iterate over each module in the processed data
    processedData.forEach(module => {
        // Iterate over each year in the module
        module.years.forEach(year => {
            // Iterate over each semester in the year
            year.semesters.forEach(semester => {
                // Calculate the total marks for the semester
                const totalMarks = semester.marks.reduce((total, mark) => total + mark.mark_percentage, 0);
                // Assign the total marks to the semester
                semester.total = totalMarks;
            });
        });
    });

    console.log('-------------------------------------------------');
    console.log(processedData);
    console.log('-------------------------------------------------');

    return processedData;
}