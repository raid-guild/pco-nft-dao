import { gql } from "@apollo/client";

export const Plots = gql`
  { 
    plots(first: 1000) {
      id
      status
    }
  }
`;
