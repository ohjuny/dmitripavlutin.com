import { graphql } from 'gatsby';
import * as React from 'react';

import PlainListAllTemplate from 'components/Pages/PlainListAll/Template';
import { PlainListAllQuery, MarkdownRemarkEdge } from 'typings/graphql';

interface PlainListAllFetchProps {
  data: PlainListAllQuery;
}

export default function PlainListAllFetch({ data }: PlainListAllFetchProps) {
  return <PlainListAllTemplate posts={data.allMarkdownRemark!.edges!.map(nodeToPostExcerpt)} />;
}

function nodeToPostExcerpt(edge: MarkdownRemarkEdge): PostExcerpt {
  return {
    ...frontmatter,
    thumbnail: frontmatter.thumbnail.childImageSharp.fluid,
  };
}

export const pageQuery = graphql`
  query PlainListAll {
    allMarkdownRemark(
      sort: { fields: [frontmatter___published], order: DESC }
      filter: { frontmatter: { draft: { eq: false } } }
    ) {
      edges {
        node {
          frontmatter {
            ...PostExcerpt
          }
        }
      }
    }
  }
`;
