import Spinner from "@/src/components/Spinner";
import React from "react";
import renderer from 'react-test-renderer';

test('Spinner snapshot', () => {
    const snap = renderer.create(
        <Spinner />
    ).toJSON()
    expect(snap).toMatchSnapshot()
})