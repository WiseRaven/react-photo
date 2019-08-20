import { getAvailableFiltersList } from './filters';

it('Filter available filters function', () => {
    const filters = [
        {
            name: 'name1',
            locked: false,
            order: 2
        },
        {
            name: 'name2',
            locked: false,
            order: 1
        },
        {
            name: null,
            locked: true,
            order: 3
        }
    ];
    const photos = [
        {
            name: 'name2'
        }
    ];
    expect(getAvailableFiltersList(filters, photos)).toEqual([
        {
            name: 'name2',
            locked: false,
            order: 1
        },
        {
            name: null,
            locked: true,
            order: 3
        }
    ]);
});
