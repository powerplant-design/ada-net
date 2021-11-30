//LIBRARY QUERY ALLWP POST NOT WORKING
// {
//     allWpPost(filter: { id: { eq: "cG9zdDo3MDAx" } }, limit: 1) {
//       nodes {
//         id
//         title
//         excerpt
//         uri
//         date(formatString: "MMMM DD, YYYY")
//         tags {
//           nodes {
//             name
//           }
//         }
//         excerpt
//         featuredImage {
//           node {
//             altText
//             localFile {
//               childImageSharp {
//                 fluid(maxWidth: 2000, quality: 60) {
//                   ...GatsbyImageSharpFluid_tracedSVG
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }

//EXISTING EVENT QUERY BACKUP
// {
//     allWpPost(
//       filter: {
//         categories: { nodes: { elemMatch: { name: { eq: "Events" } } } }
//       }
//       limit: 1
//     ) {
//       nodes {
//         id
//         title
//         excerpt
//         uri
//         date(formatString: "MMMM DD, YYYY")
//         tags {
//           nodes {
//             name
//           }
//         }
//         excerpt
//         featuredImage {
//           node {
//             altText
//             localFile {
//               childImageSharp {
//                 fluid(maxWidth: 2000, quality: 60) {
//                   ...GatsbyImageSharpFluid_tracedSVG
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }

//ARTBASE EXISITING QUERY

// {
//     allWpPost(filter: { id: { eq: "cG9zdDo2MjE3" } }, limit: 1) {
//       nodes {
//         id
//         title
//         excerpt
//         uri
//         date(formatString: "MMMM DD, YYYY")
//         tags {
//           nodes {
//             name
//           }
//         }
//         excerpt
//         featuredImage {
//           node {
//             altText
//             localFile {
//               childImageSharp {
//                 fluid(maxWidth: 2000, quality: 60) {
//                   ...GatsbyImageSharpFluid_tracedSVG
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
