import { render, screen } from "@testing-library/react";
import { DynamicTable } from "../DynamicTable";
 
describe("DynamicTable Tests", () => {
  it("should render the table with no data", () => {
    const data: [] = [];
    render(<DynamicTable data={data} />);
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });
 
  it("should render the table with  data", () => {
    const data = [
      {
        id: 1,
        name: "John",
        email: "john.doeexample.com",
        age: 25,
        phone: "1234567890",
      },
 
      {
        id: 2,
        name: "Mary",
        email: "mary.doeexample.com",
        age: 27,
        phone: "1234567000",
      },
    ];
    render(<DynamicTable data={data} />);
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Mary")).toBeInTheDocument();
    expect(screen.getByText("john.doeexample.com")).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(3);
  });
});
 