---
title: "Unlocking Seamless Call Journeys: A Guide for Voice Consultants"
description: "Lorem ipsum dolor sit amet"
pubDate: "Jul 08 2022"
heroImage: "/blog-placeholder-3.jpg"
---

In today’s fast-paced telecommunications landscape, understanding the technology behind seamless customer support systems is key to delivering great experiences. Let me take you through an example of how it all works using modern telephony and cloud-based solutions.
Imagine a company, Skadoosh, with a dedicated Customer Service Number: +31xxxxxx, where customers turn for assistance. Behind this simple number is an intricate web of technology that ensures calls are routed smoothly, efficiently, and securely, all powered by a reliable PSTN provider.
When a customer calls, the company’s Session Border Controller (SBC) springs into action. As a vigilant gatekeeper, the SBC ensures that all calls are securely managed and efficiently handled. Once the SBC processes the incoming call, it sends it through a SIP trunk, establishing a secure, high-quality connection to Azure Communication Services (ACS).
This handoff to ACS is critical. ACS provides a seamless pathway to route the call, utilizing Direct Routing to connect to the company’s Dynamics Contact Center. Here, agents are on standby, ready to deliver personalized support to the customer. This entire process—from the customer dialing in to being connected with an agent—is carefully orchestrated to ensure zero friction and maximum reliability.
For consultants and architects, understanding this journey is essential for implementing similar systems. Every component plays a vital role in delivering a seamless customer experience.

The Key Technologies You Should Know:
1. Azure Communication Services (ACS)
ACS is a cloud-based platform that allows developers to add voice, video, chat, and SMS capabilities to applications, like Dynamics 365. If you're building a support system, you can easily integrate ACS to enhance communication between customers and agents. For organizations, you can either buy a Microsoft number or, for more flexibility, port an entire range of numbers dedicated to the business.


*Figure: Example reference architecture showing how Azure Communication Services (ACS) integrates with PSTN, SBC, and Dynamics Contact Center. Source: Microsoft Docs*


2. Direct Routing
Direct Routing enables organizations to connect digital contact centers (such as Microsoft Teams or Dynamics Voice) to the PSTN through an SBC. This allows businesses to retain control over their phone numbers by bringing their own telephony provider. Consultants and architects should understand how to link the SBC to ACS via Fully Qualified Domain Name (FQDN) to ensure secure, reliable voice connectivity.

Edit Image

3. PSTN (Public Switched Telephone Network)
PSTN is the traditional global telephone network that connects businesses to customers. It remains an integral part of communication, ensuring that customers using landlines or mobile phones can seamlessly connect with digital contact centers.

Edit Image
4. SIP (Session Initiation Protocol)
SIP is the protocol that initiates and manages real-time communication sessions, such as voice calls. It plays a crucial role in maintaining call quality and stability, especially in contact centers handling voice traffic.

5. SBC (Session Border Controller)
The SBC is a vital component that manages the connection between an internal contact center network and external telephony providers. It ensures the security, control, and seamless flow of communication, making it a crucial piece in any modern telephony setup.Below is an example of a pjhyical SBC. There are also Virtual SBC though.

Edit Image
Edit Image
6. VoIP (Voice over Internet Protocol)
VoIP is a technology that enables voice calls over the internet instead of traditional phone lines. VoIP offers flexibility and scalability for digital contact centers, especially those utilizing cloud networks like ACS and Dynamics 365.

Why It Matters for Consultants and Architects:
As a consultant or architect implementing telephony solutions, understanding these technologies is essential. Whether you’re integrating ACS for cloud-based communication, setting up Direct Routing to leverage existing phone numbers, or deploying an SBC to secure call traffic, knowing how each component fits together allows you to build efficient and scalable solutions for your clients.
This knowledge empowers you to design communication systems that not only work seamlessly but also enhance the customer experience, ensuring that every call flows smoothly from start to finish.

Handy URLs:
 Bring your own carrier | Microsoft Learn 
 Azure direct routing infrastructure requirements—Azure Communication Services | Microsoft Learn 
