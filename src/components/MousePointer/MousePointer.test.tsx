import {MousePointer} from "./MousePointer";
// @ts-ignore
import * as renderer from "react-test-renderer";

it('changes the class when hovered', () => {
    const comp = <MousePointer
        x={100}
        y={200}
        label="Username"
        color="#f00"
    />;

    const component = renderer.create(comp);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
