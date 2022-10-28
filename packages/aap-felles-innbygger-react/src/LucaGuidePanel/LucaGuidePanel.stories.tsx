import { BodyShort } from "@navikt/ds-react";
import React from "react";
import {Meta, Story} from "@storybook/react";

import {LucaGuidePanel, LucaGuidePanelProps} from "./LucaGuidePanel";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "LucaGuidePanel",
  component: LucaGuidePanel,
} as Meta;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: Story<LucaGuidePanelProps> = (args) => <LucaGuidePanel {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  children: (
    <BodyShort spacing>Dette er tekst som havner inne i Luca</BodyShort>
  ),
};
