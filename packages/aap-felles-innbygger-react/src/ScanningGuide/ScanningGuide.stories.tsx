import React from "react";

import {ScanningGuide} from './ScanningGuide';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ScanningGuide",
  component: ScanningGuide,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: any) => <ScanningGuide {...args} />;

export const Bokmål = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

export const Nynorsk = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Nynorsk.args = {
  locale: 'nn'
};
