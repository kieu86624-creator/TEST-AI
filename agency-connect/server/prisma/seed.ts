import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { PrismaClient, UserRole } from '@prisma/client';
const prisma = new PrismaClient();
const avatar = (name:string)=>`https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(name)}`;
async function main(){
  await prisma.message.deleteMany(); await prisma.connection.deleteMany(); await prisma.like.deleteMany(); await prisma.comment.deleteMany(); await prisma.post.deleteMany(); await prisma.project.deleteMany(); await prisma.agencyProfile.deleteMany(); await prisma.user.deleteMany();
  const passwordHash = await bcrypt.hash('password123',10);
  const usersData = [
    ['agency@example.com','Nova Growth Agency','AGENCY','Nova Growth','TP.HCM','Performance Marketing'],['hello@brandcraft.vn','BrandCraft Studio','AGENCY','BrandCraft','Hà Nội','Branding'],['seo@rankwave.vn','RankWave SEO','AGENCY','RankWave','Đà Nẵng','SEO'],['social@cyanlab.vn','Cyan Social Lab','AGENCY','Cyan Lab','TP.HCM','Social Media'],['web@violetworks.vn','VioletWorks Digital','AGENCY','VioletWorks','Singapore','Web Design'],
    ['brand@example.com','Lan Nguyen','BRAND','Aurora Retail','TP.HCM','Retail'],['growth@finplus.vn','Minh Tran','BRAND','FinPlus','Hà Nội','Fintech'],['ops@eduhub.vn','Thao Le','BRAND','EduHub','Đà Nẵng','Education'],['freelance@example.com','Khoa Pham','FREELANCER','Khoa Creative','Remote','Content'],['consultant@example.com','Mai Strategy','CONSULTANT','Mai Strategy','Remote','Growth']
  ];
  const users=[]; for (const [email,name,role,companyName,location,industry] of usersData){ users.push(await prisma.user.create({ data:{ email,name,role:role as UserRole,passwordHash,companyName,location,avatar:avatar(name),coverImage:'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80',bio:`${companyName} giúp doanh nghiệp tăng trưởng trong lĩnh vực ${industry}.`,website:`https://${companyName.toLowerCase().replaceAll(' ','')}.example.com`, agencyProfile: role==='AGENCY'?{create:{services:'Branding, Performance Marketing, SEO, Social Media, Web Design',industries:String(industry),minBudget: role==='AGENCY'?3000:0,teamSize:['2-10','11-50','51-100'][users.length%3],rating:4.4+(users.length%5)/10,portfolio:'Launch campaign, CRO sprint, B2B lead-gen playbook'}}:undefined }})); }
  const tags=['Branding','B2B','SEO','Retail','Fintech','Social'];
  for (let i=0;i<10;i++) await prisma.post.create({ data:{ authorId:users[i%users.length].id, content:[`Chúng tôi đang tìm đối tác cùng triển khai chiến dịch tăng trưởng quý ${i+1}.`,`Case study mới: tối ưu funnel giúp CPL giảm ${20+i}% trong 45 ngày.`,`Gợi ý xu hướng ngành: cá nhân hóa nội dung và dữ liệu first-party đang tạo lợi thế lớn.`][i%3], tags:[tags[i%tags.length],tags[(i+2)%tags.length]].join(',') }});
  for (let i=0;i<5;i++) await prisma.project.create({ data:{ ownerId:users[5+i%3].id,title:[`Tìm agency Performance cho chiến dịch Q${i+1}`,`Thiết kế website B2B SaaS`, `SEO content hub cho ngành tài chính`, `Ra mắt thương hiệu D2C`, `Social always-on 6 tháng`][i], description:'Cần đối tác có kinh nghiệm, quy trình rõ ràng và báo cáo minh bạch cho dự án tăng trưởng.', budget:['$3k-$5k','$5k-$10k','$10k-$20k'][i%3], deadline:new Date(Date.now()+86400000*(14+i*7)), skills:['Strategy','Creative','Analytics','SEO'].slice(0,2+i%3).join(','), status:i===4?'IN_REVIEW':'OPEN' }});
  for (let i=0;i<10;i++) await prisma.message.create({ data:{ senderId:users[i%5].id, receiverId:users[5+i%5].id, content:`Xin chào, mình muốn trao đổi về cơ hội hợp tác số ${i+1}.` }});
  for (let i=0;i<5;i++) await prisma.connection.create({ data:{ requesterId:users[i].id, receiverId:users[5+i].id, status:i<3?'ACCEPTED':'PENDING' }});
  console.log('Seeded AgencyConnect demo data. Demo: agency@example.com / password123, brand@example.com / password123');
}
main().finally(()=>prisma.$disconnect());
