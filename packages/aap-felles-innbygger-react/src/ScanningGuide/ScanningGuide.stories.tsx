import React from "react";
import { Meta, Story } from "@storybook/react";

import { ScanningGuide, ScanningGuideProps } from "./ScanningGuide";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ScanningGuide",
  component: ScanningGuide,
} as Meta;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: Story<ScanningGuideProps> = (args) => (
  <ScanningGuide {...args} />
);

export const Bokmål = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

export const Nynorsk = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Nynorsk.args = {
  locale: "nn",
};
