/**
 * Comprehensive database seeding script for Inkosiyeza SDA Church
 * Creates rich sample data for all collections including ministries, bulletins, resources, gallery, blogs, and admin account.
 * Run this script after setting up the database to populate with realistic church data.
 */

import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

// Load environment variables
dotenv.config();

// Import models
import Ministry from "./models/Ministry.js";
import Bulletin from "./models/Bulletin.js";
import Resource from "./models/Resource.js";
import Gallery from "./models/Gallery.js";
import Blog from "./models/Blog.js";
import Admin from "./models/Admin.js";
import Content from "./models/Content.js";

/**
 * Main seeding function
 * Connects to database and populates comprehensive sample data
 */
const seedData = async () => {
  try {
    // Connect to MongoDB
    console.log("🔄 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/church_db');
    console.log("✅ MongoDB connected successfully");

    // Clear existing data
    console.log("🧹 Clearing existing data...");
    await Promise.all([
      Ministry.deleteMany({}),
      Bulletin.deleteMany({}),
      Resource.deleteMany({}),
      Gallery.deleteMany({}),
      Blog.deleteMany({}),
      Admin.deleteMany({}),
      Content.deleteMany({})
    ]);

    // Seed Content Sections
    console.log("📄 Seeding content sections...");
    await Content.insertMany([
      {
        section: "about",
        title: "About Inkosiyeza SDA Church",
        body: `Welcome to Inkosiyeza Seventh-day Adventist Church, a vibrant community of believers dedicated to spreading God's love and truth in our community and beyond.

Our church was established in 1985 with a mission to create a welcoming environment where people can grow in their relationship with Jesus Christ, fellowship with other believers, and serve our community with compassion and dedication.

We believe in the power of prayer, the importance of Bible study, and the joy of worship. Our diverse congregation comes together every Sabbath to praise God, learn from His Word, and support one another in our spiritual journey.

At Inkosiyeza SDA Church, we are committed to:
- Proclaiming the everlasting gospel of Jesus Christ
- Nurturing spiritual growth through Bible study and prayer
- Building strong Christian families and relationships
- Serving our community with love and compassion
- Preparing for the Second Coming of Jesus Christ

Join us as we walk together in faith, hope, and love.`
      },
      {
        section: "mission",
        title: "Our Mission",
        body: `To make disciples of Jesus Christ who live as His loving witnesses and proclaim to all people the everlasting gospel of the Three Angels' Messages in preparation for His soon return.

We are called to:
- Share the love of Christ through word and deed
- Nurture believers in their spiritual growth
- Serve our community with compassion
- Prepare hearts for Jesus' Second Coming`
      },
      {
        section: "vision",
        title: "Our Vision",
        body: `To be a Christ-centered church community that transforms lives, strengthens families, and impacts our community for God's kingdom.

We envision:
- A growing community of committed disciples
- Strong Christian families rooted in God's Word
- Active community service and outreach
- Unity in diversity as we worship together
- Preparation for eternal life with Jesus`
      },
      {
        section: "beliefs",
        title: "Our Beliefs",
        body: `As Seventh-day Adventists, we accept the Bible as our only creed and hold certain fundamental beliefs to be the teaching of the Holy Scriptures. These beliefs constitute our understanding and expression of the teaching of Scripture.

Key beliefs include:
- The Trinity: Father, Son, and Holy Spirit
- Salvation by grace through faith in Jesus Christ
- The authority and inspiration of Scripture
- The Second Coming of Jesus Christ
- The Sabbath as God's day of rest and worship
- The state of the dead and resurrection
- The gift of prophecy manifested in Ellen G. White
- Christian lifestyle and stewardship`
      }
    ]);

    // Seed Ministries with comprehensive data
    console.log("📋 Seeding ministries...");
    await Ministry.insertMany([
      {
        name: "Youth Ministry",
        description: "Empowering young people to develop a personal relationship with Jesus Christ and become leaders in the church and community. Our youth ministry provides a safe space for teenagers and young adults to explore their faith, build friendships, and discover their God-given talents.",
        leader: "Pastor John Smith",
        functions: [
          "Weekly Youth Bible Study (Fridays 6:00 PM)",
          "Youth Sabbath School Classes",
          "Community Service Projects",
          "Youth Camps and Retreats",
          "Pathfinder Club Activities",
          "Youth Evangelism Programs",
          "Leadership Training Workshops",
          "Sports and Recreation Activities"
        ]
      },
      {
        name: "Women's Ministry",
        description: "Supporting women in their spiritual journey while building strong sisterhood bonds. We focus on Bible study, prayer, fellowship, and community service, helping women grow in their relationship with God and each other.",
        leader: "Sister Mary Johnson",
        functions: [
          "Women's Bible Study (Wednesdays 7:00 PM)",
          "Prayer and Fellowship Groups",
          "Community Outreach Programs",
          "Health and Wellness Seminars",
          "Cooking and Nutrition Classes",
          "Mother's Day and Women's Day Programs",
          "Mentorship Programs",
          "Craft and Skill-sharing Workshops"
        ]
      },
      {
        name: "Men's Fellowship",
        description: "Strengthening spiritual leadership and brotherhood among men of all ages. We focus on developing Christian character, leadership skills, and community service while building lasting friendships.",
        leader: "Elder David Brown",
        functions: [
          "Men's Prayer Breakfast (First Sabbath of each month)",
          "Leadership Training and Development",
          "Community Service Projects",
          "Men's Retreat and Camping Trips",
          "Father and Son Activities",
          "Home Repair Ministry",
          "Evangelism and Witnessing Training",
          "Sports and Recreation Fellowship"
        ]
      },
      {
        name: "Children's Ministry",
        description: "Nurturing young hearts and minds in the love of Jesus. We provide age-appropriate programs that help children develop a strong foundation in Christian faith and values.",
        leader: "Teacher Sarah Wilson",
        functions: [
          "Children's Sabbath School (Ages 0-12)",
          "Children's Church Service",
          "Vacation Bible School (Annual)",
          "Children's Choir and Music Programs",
          "Bible Memory Verse Competitions",
          "Christian Education Support",
          "Family Fun Days and Activities",
          "Children's Christmas and Easter Programs"
        ]
      },
      {
        name: "Music Ministry",
        description: "Leading the congregation in worship through music and song. Our music ministry includes various groups and opportunities for members to use their musical talents in service to God.",
        leader: "Director Michael Davis",
        functions: [
          "Adult Choir (Rehearsals Thursdays 7:00 PM)",
          "Youth Choir and Ensemble",
          "Children's Choir",
          "Praise and Worship Team",
          "Special Music Coordination",
          "Musical Instrument Training",
          "Christmas and Easter Cantatas",
          "Community Concert Performances"
        ]
      },
      {
        name: "Health Ministry",
        description: "Promoting physical, mental, and spiritual wellness in our church and community. We believe that caring for our bodies is an important part of our Christian witness.",
        leader: "Dr. Patricia Williams",
        functions: [
          "Health Screenings and Check-ups",
          "Nutrition and Cooking Classes",
          "Exercise and Fitness Programs",
          "Stress Management Workshops",
          "Smoking Cessation Programs",
          "Mental Health Awareness",
          "Community Health Fairs",
          "First Aid and CPR Training"
        ]
      },
      {
        name: "Community Services",
        description: "Serving our community with Christ's love through practical assistance and support programs. We believe in meeting people's physical needs while sharing God's love.",
        leader: "Coordinator James Anderson",
        functions: [
          "Food Bank and Distribution",
          "Clothing Donation Center",
          "Emergency Financial Assistance",
          "Senior Citizen Support Services",
          "Homeless Outreach Programs",
          "Disaster Relief Coordination",
          "Community Garden Project",
          "Literacy and Education Support"
        ]
      },
      {
        name: "Evangelism Ministry",
        description: "Sharing the good news of Jesus Christ with our community through various outreach programs and evangelistic efforts. We are committed to fulfilling the Great Commission.",
        leader: "Evangelist Robert Thompson",
        functions: [
          "Public Evangelistic Campaigns",
          "Bible Study Programs",
          "Literature Distribution",
          "Door-to-Door Witnessing",
          "Community Bible Seminars",
          "Prophecy Seminars",
          "Personal Evangelism Training",
          "Online Ministry and Outreach"
        ]
      }
    ]);

    // Seed Bulletins with realistic church announcements
    console.log("📢 Seeding bulletins...");
    await Bulletin.insertMany([
      {
        title: "Weekly Sabbath Bulletin - December 2024",
        description: "This week's church announcements, upcoming events, and important information for our church family.",
        date: new Date(),
        file: "/uploads/bulletin-current.pdf"
      },
      {
        title: "Christmas Program Announcement",
        description: "Special Christmas celebration program details, rehearsal schedules, and volunteer opportunities.",
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        file: "/uploads/christmas-program.pdf"
      },
      {
        title: "Youth Ministry Winter Camp Registration",
        description: "Registration information and details for the annual youth winter camp retreat.",
        date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        file: "/uploads/youth-camp-registration.pdf"
      },
      {
        title: "Health Ministry Wellness Fair",
        description: "Community health fair with free screenings, health education, and wellness resources.",
        date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
        file: "/uploads/health-fair-bulletin.pdf"
      },
      {
        title: "Monthly Newsletter - November 2024",
        description: "Church newsletter featuring ministry updates, testimonies, upcoming events, and spiritual articles.",
        date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        file: "/uploads/newsletter-november.pdf"
      }
    ]);

    // Seed Resources with comprehensive church materials
    console.log("📚 Seeding resources...");
    await Resource.insertMany([
      {
        title: "Adult Sabbath School Lesson Study Guide",
        description: "Quarterly lesson study guide for adult Sabbath School classes with daily readings and discussion questions.",
        type: "pdf",
        url: "https://www.adventistbiblicalresearch.org/materials/sabbath-school-lessons"
      },
      {
        title: "Youth Sabbath School Lesson Guide",
        description: "Age-appropriate lesson materials for youth Sabbath School classes with interactive activities.",
        type: "pdf",
        url: "https://www.adventist.org/youth-lessons"
      },
      {
        title: "Church Manual - Official SDA Guidelines",
        description: "Official Seventh-day Adventist Church Manual with policies, procedures, and organizational guidelines.",
        type: "pdf",
        url: "https://www.adventist.org/church-manual/"
      },
      {
        title: "Spirit of Prophecy Library",
        description: "Complete digital collection of Ellen G. White writings including books, articles, and manuscripts.",
        type: "link",
        url: "https://egwwritings.org/"
      },
      {
        title: "Bible Study Guides - Discover Series",
        description: "Interactive Bible study guides covering fundamental Christian beliefs and prophecy topics.",
        type: "link",
        url: "https://www.biblestudyguides.org/"
      },
      {
        title: "Adventist Review Magazine",
        description: "Official magazine of the Seventh-day Adventist Church with spiritual articles and church news.",
        type: "link",
        url: "https://www.adventistreview.org/"
      },
      {
        title: "Health and Wellness Resources",
        description: "Comprehensive health education materials focusing on the eight natural remedies and healthy living.",
        type: "pdf",
        url: "/uploads/health-wellness-guide.pdf"
      },
      {
        title: "Pathfinder Club Manual",
        description: "Complete guide for Pathfinder club activities, honors, and leadership development programs.",
        type: "pdf",
        url: "/uploads/pathfinder-manual.pdf"
      },
      {
        title: "Evangelism Training Materials",
        description: "Resources for personal evangelism, Bible study methods, and witnessing techniques.",
        type: "pdf",
        url: "/uploads/evangelism-training.pdf"
      },
      {
        title: "Church History and Heritage",
        description: "Historical documents and materials about the Seventh-day Adventist Church and our local church history.",
        type: "pdf",
        url: "/uploads/church-history.pdf"
      }
    ]);

    // Seed Gallery with church event photos
    console.log("🖼️ Seeding gallery...");
    await Gallery.insertMany([
      {
        url: "/uploads/sabbath-worship-service.jpg",
        caption: "Sabbath Morning Worship Service - Congregation in Prayer"
      },
      {
        url: "/uploads/baptism-ceremony-river.jpg",
        caption: "Baptism Ceremony at the Local River - New Members Joining"
      },
      {
        url: "/uploads/youth-ministry-outreach.jpg",
        caption: "Youth Ministry Community Service Project - Feeding the Homeless"
      },
      {
        url: "/uploads/church-fellowship-meal.jpg",
        caption: "Church Fellowship Meal - Community Gathering After Service"
      },
      {
        url: "/uploads/childrens-christmas-program.jpg",
        caption: "Children's Christmas Program - Nativity Play Performance"
      },
      {
        url: "/uploads/womens-ministry-retreat.jpg",
        caption: "Women's Ministry Annual Retreat - Spiritual Growth Weekend"
      },
      {
        url: "/uploads/mens-prayer-breakfast.jpg",
        caption: "Men's Fellowship Prayer Breakfast - Monthly Gathering"
      },
      {
        url: "/uploads/vacation-bible-school.jpg",
        caption: "Vacation Bible School - Children Learning Bible Stories"
      },
      {
        url: "/uploads/health-fair-community.jpg",
        caption: "Community Health Fair - Free Health Screenings"
      },
      {
        url: "/uploads/church-choir-performance.jpg",
        caption: "Church Choir Special Performance - Easter Cantata"
      },
      {
        url: "/uploads/pathfinder-camping-trip.jpg",
        caption: "Pathfinder Club Camping Trip - Youth Adventure Weekend"
      },
      {
        url: "/uploads/evangelistic-series.jpg",
        caption: "Community Evangelistic Series - Bible Prophecy Seminar"
      }
    ]);

    // Seed Blogs with spiritual and church-related content
    console.log("✍️ Seeding blogs...");
    await Blog.insertMany([
      {
        title: "Welcome to Our New Church Website",
        slug: "welcome-new-church-website",
        content: `We are thrilled to announce the launch of our brand new church website! This digital platform represents a significant step forward in our mission to connect with our community and share God's love with the world.

Our new website serves as a central hub for our church family, providing easy access to:

**Worship and Spiritual Growth**
- Weekly sermon recordings and transcripts
- Sabbath School lesson materials
- Bible study resources and guides
- Prayer request submissions

**Community Connection**
- Ministry information and contact details
- Event calendar and announcements
- Photo galleries of church activities
- Online giving and donation options

**Outreach and Service**
- Community service opportunities
- Evangelism programs and events
- Health and wellness resources
- Educational materials and downloads

We believe that technology, when used purposefully, can be a powerful tool for ministry. This website allows us to extend our reach beyond the physical walls of our church building and connect with people wherever they are in their spiritual journey.

Whether you're a long-time member of our church family or someone who is just beginning to explore faith, we hope this website will be a valuable resource for your spiritual growth and connection with our community.

We encourage you to explore all the features of our new site and let us know how we can better serve you through this digital ministry. Together, we can use every available means to share the hope and love found in Jesus Christ.

Thank you to everyone who contributed to making this website possible. May God bless this new tool for His glory and the advancement of His kingdom.

In Christian love and service,
The Inkosiyeza SDA Church Family`,
        author: "Pastor Michael Davis",
        image: "/uploads/church-building-exterior.jpg"
      },
      {
        title: "The Power of Community in Faith",
        slug: "power-of-community-in-faith",
        content: `In our increasingly connected yet often isolated world, the importance of genuine Christian community cannot be overstated. The Bible reminds us in Hebrews 10:25: "Let us not give up meeting together, as some are in the habit of doing, but let us encourage one another—and all the more as you see the Day approaching."

**Why Community Matters**

Christian community provides us with essential elements for spiritual growth:

*Spiritual Support During Trials*
When we face life's inevitable challenges, having a community of believers who can pray with us, encourage us, and provide practical support makes all the difference. We are not meant to walk this journey alone.

*Accountability in Our Christian Walk*
Iron sharpens iron, and fellow believers help us stay on the path of righteousness. Through loving accountability, we help each other grow in Christ-likeness and overcome areas of weakness.

*Opportunities to Serve Others*
Community provides countless opportunities to use our God-given gifts and talents in service to others. Whether it's teaching children, caring for the elderly, or supporting those in need, we find purpose in serving together.

*Fellowship and Lasting Friendships*
The bonds formed in Christian community often become some of life's most treasured relationships. These friendships, built on a foundation of shared faith, provide joy, laughter, and companionship throughout life's journey.

**Building Strong Community**

At Inkosiyeza SDA Church, we are committed to fostering authentic Christian community through:

- Small group Bible studies and prayer groups
- Ministry teams that serve together
- Fellowship meals and social gatherings
- Mentorship and discipleship relationships
- Community service projects
- Support groups for various life stages and challenges

**Your Place in Our Community**

Every person who walks through our doors has something valuable to contribute to our church family. Whether you're gifted in teaching, music, hospitality, administration, or simply have a heart for prayer, there is a place for you in our community.

We invite you to take the next step in connecting with our church family. Join a ministry, attend a small group, volunteer for a community service project, or simply introduce yourself to someone new after church. 

Remember, community doesn't happen automatically—it requires intentional effort from all of us. But the rewards of deep, meaningful Christian fellowship are immeasurable.

As we continue to grow together as a church family, let us remember that we are called to be the body of Christ in our community. Each of us has a vital role to play, and together we can make a lasting impact for God's kingdom.

Come and be part of something beautiful—a community united in faith, hope, and love.`,
        author: "Elder Patricia Williams",
        image: "/uploads/community-fellowship-gathering.jpg"
      },
      {
        title: "Preparing Hearts for the Holiday Season",
        slug: "preparing-hearts-holiday-season",
        content: `As we approach the holiday season, it's easy to get caught up in the hustle and bustle of preparations, shopping, and social obligations. However, this time of year offers us a unique opportunity to pause, reflect, and prepare our hearts for the true meaning of Christmas—the celebration of God's greatest gift to humanity.

**The True Meaning of Christmas**

Christmas is fundamentally about God's love story. "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life" (John 3:16). In the birth of Jesus, we see:

- God's incredible love for humanity
- His willingness to enter our world and experience our struggles
- The beginning of our salvation story
- Hope for a broken and hurting world

**Preparing Our Hearts**

How can we prepare our hearts to truly celebrate this season?

*Practice Gratitude*
Take time each day to reflect on God's blessings in your life. Keep a gratitude journal or share thankfulness with family members during meals.

*Simplify Your Celebrations*
Focus on meaningful traditions rather than material excess. Consider how your celebrations can reflect Christian values and bring glory to God.

*Serve Others*
Follow Jesus' example of service by reaching out to those in need. Volunteer at local charities, visit the elderly, or help families in your community.

*Spend Time in God's Word*
Read the Christmas story in the Gospels of Matthew and Luke. Meditate on the prophecies of Christ's coming in the Old Testament.

*Create Sacred Moments*
Set aside time for family devotions, Christmas carols, and prayer. Make space for quiet reflection amidst the busy season.

**Holiday Outreach Opportunities**

This season, our church is organizing several ways to share Christ's love with our community:

- Christmas food basket distribution for families in need
- Caroling at local nursing homes and hospitals
- Toy drive for underprivileged children
- Community Christmas dinner for those who might be alone
- Special Christmas Eve candlelight service

**A Season of Hope**

As Seventh-day Adventists, we celebrate not only Christ's first coming but also look forward with anticipation to His second coming. The Christmas season reminds us that God keeps His promises. Just as He fulfilled His promise to send a Savior, we can trust that He will fulfill His promise to return and take us home.

Let this holiday season be a time of spiritual renewal, deeper community connection, and renewed commitment to sharing God's love with others. May our celebrations point others to the hope, peace, joy, and love found in Jesus Christ.

As we light our Christmas candles and sing our carols, let us remember that we are celebrating the Light of the World who came to dispel the darkness of sin and death. What a reason to rejoice!

Wishing you and your family a blessed and meaningful holiday season.`,
        author: "Pastor John Smith",
        image: "/uploads/christmas-nativity-scene.jpg"
      },
      {
        title: "Youth Ministry: Raising the Next Generation",
        slug: "youth-ministry-raising-next-generation",
        content: `The future of our church lies in the hands of our young people. As we look at the challenges facing today's youth—social media pressures, academic stress, peer influence, and an increasingly secular culture—we recognize the critical importance of investing in their spiritual development.

**The Biblical Foundation**

Scripture is clear about our responsibility to the next generation:

"Train up a child in the way he should go; even when he is old he will not depart from it" (Proverbs 22:6).

"These words that I command you today shall be on your heart. You shall teach them diligently to your children and shall talk of them when you sit in your house, and when you walk by the way, and when you lie down, and when you rise" (Deuteronomy 6:6-7).

**Our Youth Ministry Vision**

At Inkosiyeza SDA Church, our youth ministry is built on several key principles:

*Authentic Relationships*
We believe that ministry happens through relationships. Our youth leaders are committed to building genuine connections with each young person, providing mentorship, guidance, and support.

*Relevant Teaching*
We present biblical truths in ways that connect with the real-life experiences and questions of today's youth. Our programs address topics like identity, purpose, relationships, and decision-making from a Christian perspective.

*Service Opportunities*
We believe that young people grow in faith when they have opportunities to serve others. Our youth regularly participate in community service projects, mission trips, and outreach activities.

*Leadership Development*
We intentionally develop leadership skills in our youth, giving them opportunities to lead worship, organize events, and mentor younger children.

**Current Youth Programs**

Our youth ministry offers a variety of programs designed to meet young people where they are:

- Weekly Youth Bible Study (Fridays 6:00 PM)
- Youth Sabbath School classes
- Pathfinder Club for ages 10-15
- Adventurer Club for ages 6-9
- Annual youth camp and retreats
- Community service projects
- Youth-led worship services
- Mentorship programs

**Challenges and Opportunities**

Today's youth face unique challenges, but they also have incredible opportunities:

*Challenges:*
- Digital distractions and social media pressures
- Academic and career pressures
- Moral relativism in society
- Mental health struggles
- Peer pressure and identity issues

*Opportunities:*
- Access to information and global connections
- Passion for social justice and making a difference
- Technological skills that can be used for ministry
- Desire for authentic community and relationships
- Openness to spiritual experiences

**How You Can Support Youth Ministry**

Every church member has a role to play in supporting our young people:

*Pray Regularly*
Pray for our youth by name, for their spiritual growth, protection, and future.

*Volunteer Your Time*
Consider volunteering as a youth leader, Sabbath School teacher, or Pathfinder staff member.

*Share Your Skills*
Offer to teach workshops on topics like financial literacy, career guidance, or life skills.

*Be a Mentor*
Build relationships with young people in our church. Your life experience and wisdom are valuable gifts.

*Provide Financial Support*
Help sponsor youth for camps, mission trips, and other activities that might be financially challenging.

**The Fruit of Investment**

When we invest in our youth, we see incredible results:
- Young people who are confident in their faith
- Future church leaders being developed
- Families strengthened through intergenerational connections
- Communities impacted by service-minded young adults
- The gospel message carried forward to the next generation

**A Call to Action**

The investment we make in our youth today will determine the future of our church and community. Let us commit to supporting, encouraging, and empowering the young people in our midst.

As we work together to raise the next generation of Christian leaders, let us remember that we are not just preparing them for successful careers or happy lives—we are preparing them for eternity.

Join us in this vital ministry. Our youth need to see that the entire church family is invested in their spiritual journey. Together, we can help them develop into strong, faithful disciples of Jesus Christ who will carry the torch of faith into the future.

The future is bright when we invest in our youth today!`,
        author: "Youth Pastor Sarah Johnson",
        image: "/uploads/youth-group-activities.jpg"
      },
      {
        title: "Health and Wellness: A Holistic Approach",
        slug: "health-wellness-holistic-approach",
        content: `As Seventh-day Adventists, we believe that caring for our bodies is an important part of our Christian witness. The apostle Paul reminds us that our bodies are temples of the Holy Spirit (1 Corinthians 6:19-20), and we are called to honor God in how we care for our physical, mental, and spiritual health.

**The Eight Natural Remedies**

Our health ministry is built on the foundation of eight natural remedies that God has provided for optimal health:

*Nutrition*
Eating a balanced, plant-based diet rich in fruits, vegetables, whole grains, and legumes provides the nutrients our bodies need to function optimally.

*Exercise*
Regular physical activity strengthens our cardiovascular system, builds muscle and bone density, and improves mental health.

*Water*
Proper hydration is essential for every bodily function, from digestion to temperature regulation to waste elimination.

*Sunlight*
Moderate sun exposure provides vitamin D and helps regulate our circadian rhythms for better sleep.

*Temperance*
Moderation in all things and abstinence from harmful substances protects our bodies and minds.

*Air*
Fresh, clean air provides the oxygen our cells need and helps remove toxins from our bodies.

*Rest*
Adequate sleep and regular rest periods allow our bodies to repair and regenerate.

*Trust in God*
Faith and trust in God provide peace, reduce stress, and give us hope and purpose in life.

**Our Health Ministry Programs**

At Inkosiyeza SDA Church, we offer various programs to support the health and wellness of our members and community:

*Cooking Classes*
Learn to prepare delicious, nutritious plant-based meals that support optimal health.

*Exercise Groups*
Join walking groups, fitness classes, and other physical activities designed for all fitness levels.

*Health Screenings*
Regular health screenings help detect potential health issues early when they're most treatable.

*Stress Management Workshops*
Learn practical techniques for managing stress and maintaining mental health.

*Smoking Cessation Programs*
Support and resources for those looking to break free from tobacco addiction.

*Community Health Fairs*
Free health screenings and education for our broader community.

**Mental and Emotional Health**

We recognize that health is more than just physical. Mental and emotional wellness are equally important:

- Support groups for various life challenges
- Counseling resources and referrals
- Prayer and spiritual support
- Community connections to combat loneliness
- Educational workshops on mental health topics

**Spiritual Health**

True wellness includes spiritual health—our relationship with God and others:

- Regular Bible study and prayer
- Worship and fellowship
- Service to others
- Forgiveness and reconciliation
- Hope and purpose in life

**Practical Health Tips**

Here are some simple ways to improve your health today:

1. Start each day with a glass of water and a healthy breakfast
2. Take a 10-minute walk after meals
3. Include more fruits and vegetables in your diet
4. Get 7-8 hours of sleep each night
5. Practice deep breathing or meditation
6. Spend time in nature regularly
7. Connect with friends and family
8. Engage in regular prayer and Bible study

**Community Impact**

Our health ministry extends beyond our church walls:

- Free community health fairs
- Health education in local schools
- Support for community gardens
- Partnerships with local healthcare providers
- Advocacy for healthy community policies

**The Connection Between Health and Witness**

When we take care of our bodies, we are better able to serve God and others. Good health gives us:

- Energy to serve in ministry
- Clear minds for studying God's Word
- Emotional stability for relationships
- Longevity to impact more lives
- Credibility when sharing health principles

**A Holistic Approach**

True health involves the whole person—body, mind, and spirit. When we address all aspects of health, we experience:

- Greater vitality and energy
- Improved mood and mental clarity
- Stronger relationships
- Deeper spiritual connection
- Better quality of life
- Increased longevity

**Your Health Journey**

We invite you to join us on a journey toward better health. Whether you're dealing with chronic illness, looking to prevent disease, or simply wanting to feel your best, our health ministry is here to support you.

Remember, small changes can make a big difference. Start where you are, use what you have, and do what you can. God will bless your efforts to care for the body He has given you.

Together, let's honor God by caring for our temples and helping others do the same. When we are healthy in body, mind, and spirit, we are better equipped to serve God and share His love with the world.

Your health matters—to you, to your family, to your church, and to God. Let's make it a priority together!`,
        author: "Dr. Patricia Williams, Health Ministry Director",
        image: "/uploads/health-wellness-seminar.jpg"
      }
    ]);

    // Seed Admin Account
    console.log("👤 Creating admin account...");
    const hashedPassword = await bcrypt.hash("admin123", 12);
    await Admin.create({
      username: "admin",
      password: hashedPassword,
      createdAt: new Date()
    });

    console.log("✅ Database seeded successfully with comprehensive data!");
    console.log("\n📊 Data Summary:");
    console.log("   📄 Content Sections: 4 (About, Mission, Vision, Beliefs)");
    console.log("   📋 Ministries: 8 (Youth, Women's, Men's, Children's, Music, Health, Community Services, Evangelism)");
    console.log("   📢 Bulletins: 5 (Current announcements and newsletters)");
    console.log("   📚 Resources: 10 (Study guides, manuals, and educational materials)");
    console.log("   🖼️ Gallery: 12 (Church events and activities photos)");
    console.log("   ✍️ Blogs: 5 (Spiritual and church-related articles)");
    console.log("   👤 Admin: 1 (Default admin account)");
    
    console.log("\n🔐 Admin Login Credentials:");
    console.log("   Username: admin");
    console.log("   Password: admin123");
    console.log("\n⚠️  IMPORTANT: Change the admin password after first login!");
    console.log("\n🎉 Your church website is now ready with sample data!");
    console.log("💡 Start your server with: node server.js");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding error:", error.message);
    console.error("Full error:", error);
    process.exit(1);
  }
};

// Run the seeding function
seedData();
