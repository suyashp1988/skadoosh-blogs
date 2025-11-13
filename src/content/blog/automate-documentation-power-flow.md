---
title: "Automate Documentation of Power Automate Flow"
description: "Learn how to automatically generate documentation for your Power Automate flows using AI and Dataverse integration. Step-by-step guide to streamline your workflow documentation process."
pubDate: "Nov 13 2025"
heroImage: "/blog/automate-documentation/hero-automation.jpg"
---

# Automate Documentation of Power Automate Flow

*Originally published on [LinkedIn](https://www.linkedin.com/pulse/automate-documentation-power-flow-suyash-pandey-8gbue) by Suyash Pandey*

*Chief Automation at Skadoosh 🐼 | Dynamics CE & Power Platform Architect | Digital Contact Center Pioneer | Automation Fanatic | Making Work Fun*

Let's start immediately into the content :)

## Step 1: Trigger – Recurrence or OnDemand

Add a trigger of your choice to initiate the documentation process.

## Step 2: List processes that need to be documented

**Dataverse - List Rows on Processes**

![List Processes Configuration - showing the Dataverse List Rows action with filters for resourceid, componentstate, description, and modernflowtype](/blog/automate-documentation/list-processes.jpg)

### Explanation of the conditions

1. **Resource ID cannot be null** - You need it later to get flow definitions
2. **Component state should be published** - Otherwise it fails  
3. **Description is null** - This you can skip if you want it to be updated constantly
4. **Modernflowtype eq 0** - Only retrieve processes of type Power Automate flow

The filter condition should be: `resourceid ne null and componentstate eq 0 and description eq null and modernflowtype eq 0`

## Step 3: Get the Flow as Admins: Retrieve Flow Definition

It is an "Apply to each" to get all the flows that need to be updated. Flow will be the resource ID from the previous step. In this step we will get the flow definitions.

![Get Flow as Admin configuration showing the Power Platform Admin connector with Environment and Flow parameters](/blog/automate-documentation/get-flow-admin.jpg)

This step shows the "Get Flow as Admin" action within a "For each" loop, where we retrieve the flow definition using the resource ID from the previous step.

## Step 4: Parse JSON

**Important:** Use the JSON schema below so that it accommodates all your flows. Otherwise it will break.

The Parse JSON action is crucial for extracting the flow definition data properly.

```json
{
  "type": "object",
  "properties": {
    "body": {
      "type": "object",
      "properties": {
        "properties": {
          "type": "object",
          "properties": {
            "definition": {
              "type": "object",
              "description": "The full JSON definition of the Power Automate flow.",
              "additionalProperties": true
            },
            "workflowEntityId": {
              "type": "string",
              "description": "The unique identifier for the workflow entity in Dataverse."
            }
          },
          "required": [
            "definition"
          ],
          "additionalProperties": true
        }
      },
      "required": [
        "properties"
      ],
      "additionalProperties": true
    },
    "content": {
      "type": "object",
      "properties": {
        "properties": {
          "type": "object",
          "properties": {
            "definition": {
              "type": "object",
              "description": "The full JSON definition of the Power Automate flow.",
              "additionalProperties": true
            },
            "workflowEntityId": {
              "type": "string",
              "description": "The unique identifier for the workflow entity in Dataverse."
            }
          },
          "required": [
            "definition"
          ],
          "additionalProperties": true
        }
      },
      "required": [
        "properties"
      ],
      "additionalProperties": true
    }
  },
  "additionalProperties": true
}
```

## Step 5: Compose – Get the Body of the Definitions

Get the body of the definitions from the Parse JSON step above.

## Step 6: Run a Prompt: AI to Summarize the Flow

![AI Prompt configuration showing "Run a prompt to Summarize the flow" with Flow Definition input](/blog/automate-documentation/ai-prompt-setup.jpg)

Use AI to analyze and summarize the flow definition. The image shows the "Run a prompt" action configured to summarize the flow using the parsed flow definition.

## Step 7: Compose: Get the Relevant Workflow ID

![Workflow ID Compose action showing the expression to extract workflowEntityId](/blog/automate-documentation/workflow-id-compose.jpg)

Get the workflow ID for the flow using: `body('Parse_JSON')?['properties']?['workflowEntityId']`

We need this later to update the process. You can also use the ID from Step 2 if you want.

## Step 8: Update a Row in Dataverse

![Update the flow with the Summary - Dataverse Update action showing all the configuration fields including Description field with FlowDescription dynamic content](/blog/automate-documentation/update-flow-summary.jpg)

Here we update the process with the generated description. The image shows the "Update the flow with the Summary" action where we're updating the Dataverse Processes table with the AI-generated description in the Description field.

## Run the Flow

Run the flow and your flows are documented! If you have challenges, DM me.

---

## Create an AI Prompt to Summarize the Flow

### Setting Up the AI Prompt

![AI Prompt Setup showing the "Summarize Flow" prompt configuration with instructions and Flow Definition parameter](/blog/automate-documentation/summarize-flow-setup.jpg)

To create an effective AI prompt for flow documentation, configure it as shown in the image:

1. **Create an AI Prompt** action in your flow
2. Use the prompt name "Summarize Flow"
3. Configure the instructions: "Provide a summary of Power Automate Flow not more than 1000 characters using [Flow Definition]"
4. Set the output parameter name as "FlowDescription"
5. Use GPT-4.1 mini model for optimal results

### Key Components of the AI Prompt

- **Input**: Flow Definition (from the parsed JSON)
- **Instructions**: Clear, concise instructions for the AI
- **Character Limit**: 1000 characters to fit Dataverse field limitations
- **Output Parameter**: Named "FlowDescription" for easy reference in subsequent steps

The AI will analyze the complete flow definition JSON and provide a human-readable summary that can be used as documentation.

---

## Key Benefits of This Approach

✅ **Automated Documentation** - No more manual documentation updates  
✅ **Consistent Format** - AI ensures uniform documentation style  
✅ **Time Saving** - Bulk update all flows at once  
✅ **Always Current** - Documentation stays up-to-date with flow changes  
✅ **AI-Powered** - Leverages AI for intelligent summaries  
✅ **Scalable** - Works for any number of flows in your environment

## Technical Requirements

- **Power Platform Admin** connector access
- **Dataverse** environment with Processes table
- **AI Builder** or **Azure OpenAI** service for the summarization prompt
- **Appropriate permissions** to read and update Process records

## Next Steps

Once you have this automation in place, consider:

- **Scheduling regular runs** to keep documentation fresh
- **Extending the prompt** to include more detailed analysis
- **Adding version control** information
- **Integrating with SharePoint** or other documentation systems
- **Creating approval workflows** for documentation updates

---

**About the Author**

**Suyash Pandey** is the founder of Skadoosh B.V., specializing in Microsoft Dynamics 365 CE and Power Platform solutions. With over 10 years of experience in enterprise automation, Suyash helps organizations streamline their processes and improve efficiency through innovative Microsoft ecosystem implementations.

**Connect with Suyash:**
- [LinkedIn](https://www.linkedin.com/in/pandeysuyash/)
- [Email](mailto:suyash@ska-doosh.com)
- [Company Website](https://skadoosh-blogs.ska-doosh.workers.dev)

*#PowerPlatform #PowerAutomate #Automation #Documentation #AI #Dynamics365 #MicrosoftCloudSolutions #ProcessAutomation #DigitalTransformation*

```json
{
  "type": "object",
  "properties": {
    "body": {
      "type": "object",
      "properties": {
        "properties": {
          "type": "object",
          "properties": {
            "definition": {
              "type": "object",
              "description": "The full JSON definition of the Power Automate flow.",
              "additionalProperties": true
            },
            "workflowEntityId": {
              "type": "string",
              "description": "The unique identifier for the workflow entity in Dataverse."
            }
          },
          "required": [
            "definition"
          ],
          "additionalProperties": true
        }
      },
      "required": [
        "properties"
      ],
      "additionalProperties": true
    },
    "content": {
      "type": "object",
      "properties": {
        "properties": {
          "type": "object",
          "properties": {
            "definition": {
              "type": "object",
              "description": "The full JSON definition of the Power Automate flow.",
              "additionalProperties": true
            },
            "workflowEntityId": {
              "type": "string",
              "description": "The unique identifier for the workflow entity in Dataverse."
            }
          },
          "required": [
            "definition"
          ],
          "additionalProperties": true
        }
      },
      "required": [
        "properties"
      ],
      "additionalProperties": true
    }
  },
  "additionalProperties": true
}
```

## Step 5: Compose – Get the Body of the Definitions

Get the body of the definitions from the Parse JSON step above.

![Step 5 - Compose Body](/blog-placeholder-5.jpg)

## Step 6: Run a Prompt: AI to Summarize the Flow

Use AI to analyze and summarize the flow definition. See the section below on how to create the AI prompt.

![Step 6 - AI Prompt](/blog-placeholder-1.jpg)

## Step 7: Compose: Get the Relevant Workflow ID

Get the workflow ID for the flow using: `body('Parse_JSON')?['properties']?['workflowEntityId']`

We need this later to update the process. You can also use the ID from Step 2 if you want.

![Step 7 - Workflow ID](/blog-placeholder-2.jpg)

## Step 8: Update a Row in Dataverse

Here we update the process with the generated description.

![Step 8 - Update Row](/blog-placeholder-3.jpg)

## Run the Flow

Run the flow and your flows are documented! If you have challenges, DM me.

---

## Create an AI Prompt to Summarize the Flow

### Setting Up the AI Prompt

To create an effective AI prompt for flow documentation:

![AI Prompt Setup](/blog-placeholder-4.jpg)

1. **Create an AI Prompt** action in your flow
2. Configure the prompt to analyze the flow definition JSON
3. Ask the AI to provide a clear, concise description of what the flow does
4. Include instructions for the AI to identify key components, triggers, and outcomes

### Sample AI Prompt Template

```
Analyze the following Power Automate flow definition and provide a clear, 
professional description of what this flow does, including:
- Main purpose and objective
- Key triggers and conditions
- Primary actions taken
- Expected outcomes

Flow Definition: [Flow JSON from previous step]

Please provide a concise but comprehensive description suitable for 
documentation purposes.
```

---

## Key Benefits of This Approach

✅ **Automated Documentation** - No more manual documentation updates  
✅ **Consistent Format** - AI ensures uniform documentation style  
✅ **Time Saving** - Bulk update all flows at once  
✅ **Always Current** - Documentation stays up-to-date with flow changes  
✅ **AI-Powered** - Leverages AI for intelligent summaries  

## Next Steps

Once you have this automation in place, consider:

- Scheduling regular runs to keep documentation fresh
- Extending the prompt to include more detailed analysis
- Adding version control information
- Integrating with your broader documentation system

---

**About the Author**

**Suyash Pandey** is the founder of Skadoosh B.V., specializing in Microsoft Dynamics 365 CE and Power Platform solutions. With over 10 years of experience in enterprise automation, Suyash helps organizations streamline their processes and improve efficiency through innovative Microsoft ecosystem implementations.

**Connect with Suyash:**
- [LinkedIn](https://www.linkedin.com/in/pandeysuyash/)
- [Email](mailto:suyash@ska-doosh.com)
- [Company Website](https://skadoosh-blogs.ska-doosh.workers.dev)

*#PowerPlatform #PowerAutomate #Automation #Documentation #AI #Dynamics365 #MicrosoftCloudSolutions*