export default class DataManipulation {
    formatString(string) {
        let result = string.replace(/_/g, ' ');
        return result.charAt(0).toUpperCase() + result.slice(1).toLowerCase();
    }
}
