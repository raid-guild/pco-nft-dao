import { gql } from "@apollo/client";

export const Plots = gql`
  {
    query
    Plot(first: 1000) {
      id
      status
    }
  }
`;
