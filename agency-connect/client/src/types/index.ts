export type Role = 'AGENCY'|'BRAND'|'FREELANCER'|'CONSULTANT';
export type User = { id:string; name:string; email:string; role:Role; avatar?:string; coverImage?:string; bio?:string; companyName?:string; website?:string; location?:string; agencyProfile?:AgencyProfile };
export type AgencyProfile = { services:string; industries:string; minBudget:number; teamSize:string; rating:number; portfolio:string };
export type Post = { id:string; content:string; tags:string; createdAt:string; author:User; likes:{id:string;userId:string}[]; comments:Comment[] };
export type Comment = { id:string; content:string; createdAt:string; author:Pick<User,'id'|'name'|'avatar'> };
export type Project = { id:string; title:string; description:string; budget:string; deadline:string; skills:string; status:'OPEN'|'IN_REVIEW'|'CLOSED'; owner:User };
export type Conversation = { user:User; lastMessage:Message };
export type Message = { id:string; senderId:string; receiverId:string; content:string; createdAt:string };
