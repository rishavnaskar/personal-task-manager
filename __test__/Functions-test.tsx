import { generateHash } from "@/src/utils/helper";

it('generateHash to test', () => {
    expect(generateHash('abc')).toEqual(96354)
})