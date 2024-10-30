export const getAppConfigQuery = `
query getAppConfig {
    appConfig {
      cms {
        navbar {
          title
          subtitle
        }
        home {
          title
          subtitle
          launcherText
          footerText
        }
        blog {
          title
          subtitle
          footerText
        }
        openfitness {
          title
          subtitle
          topics
        }
        ai_chat {
          title
          subtitle
          available_models {
            name
            value
            description
            notes
          }
        }
        netlifyBadges {
          familyApps
          homeServer
          openFitness
          aiChat
          smartCamera
        }
        apps {
          name
          icon
          link
          url
          dev_url
          repo
          disabled
          category
          tags
        }
        dockerApps {
          name
          icon
          disabled
        }
      }  
    }
  }
`;
