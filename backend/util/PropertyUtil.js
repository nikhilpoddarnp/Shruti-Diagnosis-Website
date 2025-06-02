

class PropertyUtil {

    static isNotEmpty(value){
        if (value === null || value === undefined) return false;
        if (typeof value === 'string' && value.trim() === '') return false;
        if (Array.isArray(value) && value.length === 0) return false;
        if (typeof value === 'object' && Object.keys(value).length === 0) return false;
        return true;
    }

    static isEmpty(value){
        return !this.isNotEmpty(value);
    }

    static copyProperties(source, target){
        for (const key in source) {
            if (source.hasOwnProperty(key)) {
                const value = source[key];
                if (PropertyUtil.isNotEmpty(value)) {
                    target[key] = value;
                }
            }
        }
    }
}

module.exports = PropertyUtil;

