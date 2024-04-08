import React from "react"
import {screen, render} from "@testing-library/react"

import {ImageWidget} from "./image-widget";

describe("ImageWidget", () => {
    it("should render the component", () => {
        render(<ImageWidget contentLanguage="en_US" message="World"/>);

        expect(screen.getByText(/Hello World/)).toBeInTheDocument();
    })
})
