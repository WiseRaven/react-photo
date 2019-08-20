import { createShareHash, parseShareHash, getProcessingPercent, getFileExtension } from './photo';

it('Generate share link from file array', () => {
    const files = [
        {
            photoId: 'FFEFEFF8FF'
        },
        {
            photoId: 'DD039DDSD'
        },
        {
            photoId: 'KEKFI837FDFHD'
        }
    ];
    expect(createShareHash(files)).toBe('#uploads=FFEFEFF8FF,DD039DDSD,KEKFI837FDFHD');
});

it('Parse valid share link to array fileIds', () => {
    expect(parseShareHash('#uploads=FFEFEFF8FF,DD039DDSD,KEKFI837FDFHD')).toEqual([
        'FFEFEFF8FF',
        'DD039DDSD',
        'KEKFI837FDFHD'
    ]);
});
it('Parse invalid share link to array fileIds', () => {
    expect(parseShareHash('#uploadsqq=FFEFEFF8FF,DD039DDSD,KEKFI837FDFHD')).toEqual([]);
    expect(parseShareHash('#uploads=FFEFE&dsds')).toEqual(['FFEFE']);
});

describe('Calculate percent', () => {
    test('Positive case', () => {
        expect(getProcessingPercent({
            status: 'in_queue',
            percent: 30
        })).toBe(10);
        expect(getProcessingPercent({
            status: 'in_queue',
            percent: 100
        })).toBe(33);
        expect(getProcessingPercent({
            status: 'sending',
            percent: 0
        })).toBe(33);
        expect(getProcessingPercent({
            status: 'sending',
            percent: 100
        })).toBe(66);
        expect(getProcessingPercent({
            status: 'modeling',
            percent: 0
        })).toBe(66);
        expect(getProcessingPercent({
            status: 'modeling',
            percent: 100
        })).toBe(100);
    });
    test('With unexpected data', () => {
        expect(getProcessingPercent({
            status: 'modeling12',
            percent: 57
        })).toBe(57);
        expect(getProcessingPercent({
            status: 'modeling12',
            Somepercent: 57
        })).toBe(0);
    });
});

it('Get File Extension by full path', () => {
    expect(
        getFileExtension('https://domain.com/storage/app/uploads/Tq505HgvOZ5J9AghZg8pRmjP_model.jpg')
    ).toBe('jpg');
    expect(
        getFileExtension('https://domain.com/storage/app/uploads/Tq505HgvOZ5J9AghZg8pRmjP_model.jpeg')
    ).toBe('jpeg');
    expect(
        getFileExtension('https://domain.com/storage/app/uploads/Tq505.HgvOZ5J9AghZg8pRmjP_model.png')
    ).toBe('png');
    expect(
        getFileExtension('https://domain.com/storage/app/uploads/Tq505.HgvOZ5J9AghZg8pRmjP_model.PNG')
    ).toBe('PNG');
    expect(
        getFileExtension('https://domain.com/storage/app/uploads/Tq505.HgvOZ5J9AghZg8pRmjP_model.txt')
    ).toBeNull();

});
