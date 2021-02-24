
const axios = require('axios');

module.exports.fetchMenu = async function fetchMenu(menuDate) {
    console.info(`Fetching ${menuDate} from API`);
    const response = await axios.get('https://family.titank12.com/api/FamilyMenu', {
        params: {
            buildingId: '283e94c2-ca80-ea11-bd63-ffff13125edb', //prairie queen
            districtId: 'c05ea998-db78-ea11-bd65-9de4e94ad6c2', //PLCSchools
            startDate: menuDate
        }
    });

    try {
        const day = response.data.FamilyMenuSessions[0].MenuPlans[0].Days[0];
        const entrees = day.RecipeCategories.find(it => it.CategoryName === 'Entree').Recipes;
        const entreeNames = entrees.map(it => it.RecipeName);
        return { date: day.Date, entreeNames };
    } catch (error) {
        console.error(`Error parsing response ${JSON.stringify(response.data)}`, error);
        throw error;
    }
}
