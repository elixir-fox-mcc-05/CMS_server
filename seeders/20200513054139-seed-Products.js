'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
      {
        name: 'Macbook Pro 2020',
        description: 'The MacBook Pro 2020 provides a power boost —  along with a much better keyboard. For the same starting price, you now get double the storage and the same great Magic Keyboard that\'s on the MacBook Air and 16-inch MacBook Pro.',
        image_url: 'https://asset.kompas.com/crops/RgC3AaQwCSYsuZRpCO9OSyRrE6s=/40x44:784x541/750x500/data/photo/2019/11/14/5dcca5e5d5a59.png',
        price: 35000000,
        stock: 25,
        category: 'Notebook',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'iPhone 11 Pro',
        description: 'It sports a 12-megapixel camera on the front for selfies, with an f/2.2 aperture. iPhone 11 Pro based on iOS 13 and packs 64GB of inbuilt storage.',
        image_url: 'https://images.macrumors.com/t/Gu7h8pvZDHc1cSwr9tWKV60ob_I=/800x0/article-new/2019/09/iphone11progold-800x636.jpg',
        price: 18000000,
        stock: 100,
        category: 'Smartphone',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'iPad Pro 2020',
        description: 'The iPad Pro family is a line of iPad tablet computers designed, developed, and marketed by Apple Inc., that runs the iOS and iPadOS mobile operating systems. ',
        image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2018/11/9/5138814/5138814_8fee9e29-4789-4ec3-be3a-189523409a47_970_1020.png',
        price: 12000000,
        stock: 40,
        category: 'Tablet',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Samsung Galaxy S20 Plus',
        description: 'The 6.7-inch Samsung Galaxy S20 Plus is an Android phone that has almost everything in the top-line 6.9-inch Galaxy S20 Ultra model, Buyers get a quartet of lenses on the Galaxy S20 Plus.',
        image_url: 'https://www.bursahpsamsung.com/wp-content/uploads/2020/02/samsung-galaxy-s20-plus.jpg.webp',
        price: 17500000,
        stock: 100,
        category: 'Smartphone',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Asus ROG Zephyrus S',
        description: 'This Asus ROG Zephyrus S GX531GWR laptop comes with Intel Core i7-9750H processor with 24GB RAM and 1TB hard drive. It has a 15.6 inch FHD IPS screen panel with a resolution of 1920 x 1080 pixels.',
        image_url: 'https://s3.bukalapak.com/uploads/content_attachments/2218/w-744/Asus_ROG_Zephyrus_S_GX701_3_asus.jpg',
        price: 30000000,
        stock: 20,
        category: 'Gaming Notebook',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Asus ROG Zephyrus M',
        description: 'ROG Zephyrus M is built for gamers seeking the ultimate experience on a laptop in an ultraslim 0.78" thin form factor. It plows through AAA titles thanks to its full-powered NVIDIA GeForce graphics.',
        image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/7/9/30488267/30488267_9e19642b-a183-4fbe-a532-ef56e45904da_700_700',
        price: 23000000,
        stock: 45,
        category: 'Gaming Notebook',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Dell XPS 15',
        description: 'Beneath the silvery skin of this premium mainstream laptop beats the heart of an entry-level gaming laptop. Outfitted with an Nvidia GeForce GTX 1050 Ti Max-Q GPU with 4GB of VRAM.',
        image_url: 'https://i.dell.com/sites/csimages/Video_Imagery/all/xps_7590_touch.png',
        price: 30000000,
        stock: 25,
        category: 'Notebook',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'ROG Mothership',
        description: 'Essentially, the Asus ROG Mothership is a mini all-in-one gaming PC, stretching the very definition of the word "laptop." All the venting and components reside in the display portion of the system.',
        image_url: 'https://d2pa5gi5n2e1an.cloudfront.net/global/images/product/laptops/ASUS_ROG_Mothership_GZ700_3/ASUS_ROG_Mothership_GZ700_3_L_1.jpg',
        price: 90000000,
        stock: 15,
        category: 'Gaming PC',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'iMac Pro 2020',
        description: 'The iMac Pro is a powerful, professional all-in-one that may only be for a very particular clientele. It offers a lot of raw power and a premium price tag to match.',
        image_url: 'https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Fdavidphelan%2Ffiles%2F2018%2F04%2FiMacPro_5k-retina-display_20171214-1200x974.jpg',
        price: 60000000,
        stock: 0,
        category: 'PC',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mac Pro 2020',
        description: 'The new Mac Pro starts for the 8-core model with 32 GB of RAM and a 256-GB solid-state drive. That can be configured up to a 28-core model with 1.5 terabytes of RAM.',
        image_url: 'https://images-na.ssl-images-amazon.com/images/I/71crxsLhDxL.jpg',
        price: 75000000,
        stock: 10,
        category: 'PC',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'iPhone 11',
        description: 'The iPhone 11 succeeds the iPhone XR, and it features a 6.1-inch LCD display that Apple calls a "Liquid Retina HD Display." It features a 1792 x 828 resolution at 326ppi.',
        image_url: 'https://images.macrumors.com/t/NxYzz74sOpNPX8jb3lvcLmu_mSc=/800x0/article-new/2019/01/iphone11wallpaper-800x637.jpg',
        price: 14000000,
        stock: 150,
        category: 'Smartphone',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Samsung Galaxy Note 10+',
        description: 'The Samsung Galaxy Note 10 Plus has such an immersive 6.8-inch display that you\'ll sometimes forget you\'re not watching TV. And the back of the Galaxy Note 10 Plus is just as captivating as the front.',
        image_url: 'https://images.samsung.com/is/image/samsung/uk-galaxy-note10plus-sm-n975-sm-n975fzsdbtu-179669580?$PD_GALLERY_L_JPG$',
        price: 18000000,
        stock: 50,
        category: 'Smartphone',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'HP Spectre x360',
        description: 'The Spectre x360 starts for the base model with a 1080p display, a Core i5-1035G1 GPU, 8GB of RAM and a 256GB SSD. If display quality matters more than battery life, you can spend more on a 4K OLED model.',
        image_url: 'https://www8.hp.com/id/en/images/Copy_of_sureview_desktop_2x_tcm189_2994683_tcm189_2994684_tcm189-2994683.jpg',
        price: 28000000,
        stock: 30,
        category: 'Notebook',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'iPad Mini 2020',
        description: 'The iPad Mini (branded and marketed as iPad mini) is a line of mini tablet computers designed, developed, and marketed by Apple Inc. It is a sub-series of the iPad line of tablets, with a reduced screen size of 7.9 inches.',
        image_url: 'https://www.tigmoo.com/media/catalog/product/cache/2/image/9df78eab33525d08d6e5fb8d27136e95/m/u/muxd2.jpg',
        price: 10000000,
        stock: 50,
        category: 'Tablet',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Samsung Galaxy S20',
        description: 'The 6.4-inch Samsung Galaxy S20 is an Android phone that has almost everything in the top-line Galaxy S20 model, Buyers get a quartet of lenses on the Galaxy S20, headlined by a 64-MP telephoto with 3x lossless zoom.',
        image_url: 'https://images.samsung.com/id/smartphones/galaxy-s20/buy/1-9-hubble-x1-cosmic-gray-gallery-mobile-img.jpg',
        price: 12500000,
        stock: 75,
        category: 'Smartphone',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
