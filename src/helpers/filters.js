export const changeActiveFilter = (name, list) => {
    let tempList = [...list]
    const choosedFilter = tempList.find(filter => filter.name === name);
    const isActive = choosedFilter.active;
    tempList = tempList.map(filter => { filter.active = false; return filter });
    choosedFilter.active = !isActive;
    if (!choosedFilter.active) {
        tempList.find(filter => filter.name === 'model').active = true;
    }
    return tempList;
}

export const getActiveFilterName = (list) => {
    const activeFilterItem = list.find(filter => filter.active) || null;
    return activeFilterItem ? activeFilterItem.name : null;
}

export const getAvailableFiltersList = (filtersList, retouchedPhotosList) => {
    const availableFilters = retouchedPhotosList.reduce((acc, item) => {
        filtersList.filter(filter => {
            if ((filter.name === item.name && filter.name !== 'model') || filter.locked) acc.push(filter);
            return filter;
        });
        return acc;
    }, []);
    const unique = [...new Set(availableFilters)];

    return unique.sort((a, b) => {
        if (a.order < b.order) return -1;
        if (a.order > b.order) return 1;
        return 0;
    });
}