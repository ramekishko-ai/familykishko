import React, { useState, useEffect, useMemo } from 'react';
import { 
  BookOpen, 
  Users, 
  Sparkles, 
  PlusCircle, 
  Search, 
  Filter, 
  Heart, 
  Play, 
  Pause, 
  Calendar, 
  User, 
  Moon, 
  Sun, 
  Feather, 
  Volume2, 
  Image as ImageIcon, 
  ChevronRight, 
  X, 
  Award,
  Bookmark,
  FolderGit2,
  UploadCloud,
  Maximize2,
  Edit3,
  Trash2,
  Check,
  Camera,
  RotateCcw,
  Lock,
  Unlock,
  KeyRound,
  MessageCircle,
  Facebook,
  HeartHandshake,
  Plus,
  Share2,
  Link,
  Info,
  Globe,
  Settings,
  Download,
  Upload,
  Cloud,
  CloudOff
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, onSnapshot } from 'firebase/firestore';

// Initialize Cloud Database safely
let app = null;
let auth = null;
let db = null;
const appId = typeof __app_id !== 'undefined' ? __app_id : 'kishko-family-heritage';

try {
  if (typeof __firebase_config !== 'undefined' && __firebase_config) {
    const firebaseConfig = JSON.parse(__firebase_config);
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  }
} catch (err) {
  console.error('Cloud init fallback:', err);
}

// Comprehensive Bilingual Translations Dictionary
const TRANSLATIONS = {
  ar: {
    siteTitle: 'عائلة كشكو',
    siteSubtitle: 'موقع تفاعلي للقصص والآلبوم العائلي',
    feedTab: 'جدار القصص',
    treeTab: 'شجرة العائلة',
    galleryTab: 'معرض الصور',
    aboutTab: 'التبرع والتواصل',
    adminMode: 'وضع التعديل',
    lock: 'قفل',
    editorLogin: 'دخول المحرر',
    addNew: 'إضافة جديد',
    bannerBadge: 'أنت الآن في وضع المحرر: يمكنك التعديل وإضافة الفروع والروابط',
    bannerWelcome: 'مرحباً بكم في موقع وصرح ذاكرة عائلة كشكو',
    bannerTitle: 'أرشيف ومتحف ذاكرة عائلة كشكو',
    filterBranch: 'تصفح حسب الفرع العائلي:',
    searchPlaceholder: 'ابحث في قصص العائلة...',
    allBranches: 'كل الفروع والأجيال',
    addBranch: 'إضافة فرع',
    familyTreeTitle: 'أفراد وشجرة العائلة',
    addMemberBtn: 'إضافة فرد جديد للعائلة',
    deleteMemberConfirm: 'هل أنت متأكد من حذف هذا الفرد من شجرة العائلة؟',
    selectBranchLabel: 'الفرع العائلي',
    birthYearLabel: 'سنة الميلاد (اختياري)',
    galleryTitle: 'معرض الصور العائلي',
    addPhoto: 'إضافة صورة جديدة',
    donationTitle: 'التواصل والدعم الصندوقي لعائلة كشكو',
    donationDesc: 'يسعدنا تواصل جميع أبناء وأقارب وأصدقاء عائلة كشكو. نخصص هذا الصندوق والموقع لدعم المناسبات العائلية والمبادرات الخيرية ولصيانة وتوثيق تاريخ سلالتنا الكريمة.',
    whatsapp: 'واتساب العائلة',
    whatsappDesc: 'تواصل مباشر وتكافل',
    facebook: 'صفحة الفيسبوك',
    facebookDesc: 'لمتابعة الأنشطة والأخبار',
    donate: 'رابط التبرع/الدعم',
    donateDesc: 'المساهمة في الصندوق العائلي',
    footerText: 'موقع عائلة كشكو التفاعلي والمستقل',
    adminPinTitle: 'تسجيل دخول المحرر',
    adminPinDesc: 'أدخل الرمز السري للتحكم والتعديل (الرمز الافتراضي: 1234)',
    cancel: 'إلغاء',
    confirmLogin: 'تأكيد الدخول',
    wrongPin: 'الرمز السري غير صحيح!',
    saveChanges: 'حفظ التغييرات',
    editCustomization: 'تخصيص المسميات والعناوين',
    customizeModalTitle: 'تخصيص عناوين الموقع والفروع والتصنيفات',
    mainTitleLabel: 'عنوان الموقع الرئيسي',
    categoriesLabel: 'التصنيفات (مفصولة بفاصلة)',
    saveCustomization: 'حفظ التخصيص',
    likes: 'إعجاب',
    changePhoto: 'تغيير الصورة',
    deleteBranch: 'حذف الفرع',
    deleteStory: 'إزالة هذه القصة',
    deletePhotoConfirm: 'هل أنت تأكد من حذف هذه الصورة؟',
    branchTitle: 'فرع عائلي جديد',
    branchNamePlaceholder: 'مثال: فرع أحفاد عكّا',
    branchDescPlaceholder: 'مثال: الجيل الجديد من العائلة المقيمين في القدس',
    saveBranch: 'حفظ الفرع',
    updateLinks: 'تحديث الروابط',
    authorLabel: 'اسم الراوي/الكاتب',
    storyContentLabel: 'مضمون القصة',
    imageUrlLabel: 'رابط الصورة (Image URL)',
    fullNameLabel: 'الاسم الكامل',
    roleLabel: 'الصفة/اللقب',
    memberPhotoLabel: 'رابط الصورة الشخصية',
    changePinBtn: 'تغيير كلمة السر (PIN)',
    changePinModalTitle: 'تغيير الرمز السري للمحرر',
    currentPinLabel: 'الرمز السري الحالي',
    newPinLabel: 'الرمز السري الجديد',
    confirmPinLabel: 'تأكيد الرمز الجديد',
    pinChangedSuccess: 'تم تغيير الرمز السري بنجاح!',
    wrongCurrentPin: 'الرمز الحالي غير صحيح!',
    pinMismatch: 'الرمز الجديد غير متطابق!',
    commentsTitle: 'التعليقات والذكريات على الصورة',
    addCommentPlaceholder: 'أضف تعليقاً أو ذكرى على هذه الصورة...',
    sendComment: 'إرسال',
    commentAuthorPlaceholder: 'اسمك الكريم',
    saveAllBtn: 'حفظ كافة التعديلات',
    savedSuccessToast: 'تم حفظ ومزامنة جميع التغييرات سحابياً بنجاح!',
    cloudSynced: 'متصل ومزامن للجميع',
    cloudOffline: 'وضع محلي',
    exportBackup: 'تصدير نسخة احتياطية',
    importBackup: 'استيراد نسخة',
    backupImportedToast: 'تم استيراد النسخة الاحتياطية ومزامنتها بنجاح!',
    imageTooLargeAlert: 'حجم الصورة كبير جداً للمزامنة السحابية. تم ضغطها تلقائياً.'
  },
  en: {
    siteTitle: 'Kishko Family',
    siteSubtitle: 'Interactive Family Stories & Album',
    feedTab: 'Stories Wall',
    treeTab: 'Family Tree',
    galleryTab: 'Photo Gallery',
    aboutTab: 'Donation & Contact',
    adminMode: 'Edit Mode',
    lock: 'Lock',
    editorLogin: 'Editor Login',
    addNew: 'Add New',
    bannerBadge: 'You are in Edit Mode: You can edit branches, titles, and links',
    bannerWelcome: 'Welcome to the Kishko Family Heritage & Memory Archive',
    bannerTitle: 'Kishko Family Archive & Museum',
    filterBranch: 'Filter by Family Branch:',
    searchPlaceholder: 'Search family stories...',
    allBranches: 'All Branches & Generations',
    addBranch: 'Add Branch',
    familyTreeTitle: 'Family Members & Tree',
    addMemberBtn: 'Add New Family Member',
    deleteMemberConfirm: 'Are you sure you want to delete this family member?',
    selectBranchLabel: 'Family Branch',
    birthYearLabel: 'Birth Year (Optional)',
    galleryTitle: 'Family Photo Gallery',
    addPhoto: 'Add New Photo',
    donationTitle: 'Communication & Family Fund Support',
    donationDesc: 'We welcome all members, relatives, and friends of the Kishko family. This platform supports family events, charity initiatives, and historical documentation.',
    whatsapp: 'Family WhatsApp',
    whatsappDesc: 'Direct communication & solidarity',
    facebook: 'Facebook Page',
    facebookDesc: 'Activities & news',
    donate: 'Donation Link',
    donateDesc: 'Contribute to the family fund',
    footerText: 'Interactive Independent Kishko Family Platform',
    adminPinTitle: 'Editor Authentication',
    adminPinDesc: 'Enter PIN code to manage and edit (Default PIN: 1234)',
    cancel: 'Cancel',
    confirmLogin: 'Confirm Login',
    wrongPin: 'Incorrect PIN code!',
    saveChanges: 'Save Changes',
    editCustomization: 'Customize Titles & Labels',
    customizeModalTitle: 'Customize Site Titles, Branches & Categories',
    mainTitleLabel: 'Main Site Title',
    categoriesLabel: 'Categories (comma separated)',
    saveCustomization: 'Save Customization',
    likes: 'likes',
    changePhoto: 'Change Photo',
    deleteBranch: 'Delete Branch',
    deleteStory: 'Remove this story',
    deletePhotoConfirm: 'Are you sure you want to delete this photo?',
    branchTitle: 'New Family Branch',
    branchNamePlaceholder: 'e.g., Acre Descendants Branch',
    branchDescPlaceholder: 'e.g., The new generation of the family living in Jerusalem',
    saveBranch: 'Save Branch',
    updateLinks: 'Update Links',
    authorLabel: 'Author / Narrator',
    storyContentLabel: 'Story Content',
    imageUrlLabel: 'Image URL',
    fullNameLabel: 'Full Name',
    roleLabel: 'Role / Title',
    memberPhotoLabel: 'Profile Photo URL',
    changePinBtn: 'Change Editor PIN',
    changePinModalTitle: 'Change Admin PIN Code',
    currentPinLabel: 'Current PIN Code',
    newPinLabel: 'New PIN Code',
    confirmPinLabel: 'Confirm New PIN',
    pinChangedSuccess: 'PIN code successfully changed!',
    wrongCurrentPin: 'Incorrect current PIN!',
    pinMismatch: 'New PIN codes do not match!',
    commentsTitle: 'Photo Comments & Memories',
    addCommentPlaceholder: 'Add a comment or memory about this photo...',
    sendComment: 'Send',
    commentAuthorPlaceholder: 'Your Name',
    saveAllBtn: 'Save All Changes',
    savedSuccessToast: 'All changes synced to the cloud for everyone!',
    cloudSynced: 'Cloud Synced',
    cloudOffline: 'Local Mode',
    exportBackup: 'Export Backup',
    importBackup: 'Import Backup',
    backupImportedToast: 'Backup imported and synced successfully!',
    imageTooLargeAlert: 'Image compressed automatically for cloud sharing.'
  }
};

// Helper to compress uploaded images so they fit cleanly in cloud shared storage (< 1MB doc limit)
const compressImageDataUrl = (dataUrl, maxWidth = 650, quality = 0.72) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
};

// Initial Bilingual Data
const INITIAL_STORIES = [
  {
    id: 'story-1',
    title: { ar: 'حكاية الدار العتيقة في يافا', en: 'The Tale of the Old House in Jaffa' },
    author: { ar: 'الجد رامي كشكو', en: 'Grandpa Rami Kishko' },
    category: { ar: 'قصص الأجداد', en: 'Ancestral Stories' },
    branchId: 'b1',
    date: '1948',
    content: {
      ar: 'كانت الدار مطلة على البحر، ورائحة زهر البرتقال تفوح في كل صباح. يجتمع العمام في الإيوان الكبير حول صينية القهوة المحوجة بالهيل، ونستمع إلى حكايات الجد عن الرحلات البحرية والتجارة بين عكّا ويافا.',
      en: 'The house overlooked the sea, and the scent of orange blossoms filled every morning. The uncles gathered in the grand porch around the cardamom-infused coffee tray, listening to Grandpa\'s tales of sea voyages and trade between Acre and Jaffa.'
    },
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    audioUrl: null,
    likes: 24
  },
  {
    id: 'story-2',
    title: { ar: 'سر وصفة المنسف الملكي الخاصة بعائلتنا', en: 'The Secret Recipe of Our Family Royal Mansaf' },
    author: { ar: 'الجدة أم رامي', en: 'Grandma Um Rami' },
    category: { ar: 'الوصفات والمأكولات', en: 'Recipes & Cuisine' },
    branchId: 'b1',
    date: '1975',
    content: {
      ar: 'سر الطعم اللذيذ للجميد الكركي مع اللحم البلدي ليس فقط في السمن البلقاوي، بل في إضافة حبوب البهار السري التي تناقلتها نساء عائلة كشكو جيلاً بعد جيل.',
      en: 'The secret to the delicious taste of Karak Jameed with local meat isn\'t just the Balqa ghee, but the secret spice seeds passed down through Kishko women generation after generation.'
    },
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80',
    audioUrl: null,
    likes: 18
  }
];

const FAMILY_BRANCHES = [
  { id: 'all', name: { ar: 'كل الفروع والأجيال', en: 'All Branches & Generations' }, description: { ar: 'جميع أفراد وأنساب عائلة كشكو', en: 'All members and lineages of the Kishko family' } },
  { id: 'b1', name: { ar: 'فرع الأجداد والروّاد', en: 'Ancestors & Pioneers Branch' }, description: { ar: 'الجيل الأول، الأصول والبدايات التاريخية', en: 'The first generation, origins, and historical beginnings' } },
  { id: 'b2', name: { ar: 'فرع الجيل الثاني (الأبناء)', en: 'Second Generation (Sons) Branch' }, description: { ar: 'أبناء الجيل الأول وحَفَظة التراث', en: 'Children of the first generation and heritage keepers' } },
  { id: 'b3', name: { ar: 'فرع الأحفاد والشباب', en: 'Grandchildren & Youth Branch' }, description: { ar: 'الجيل الجديد، المستقبل والابتكار', en: 'The new generation, future, and innovation' } }
];

const INITIAL_FAMILY_MEMBERS = [
  {
    id: 'm1',
    name: { ar: 'الحاج احمد كشكو (ابو حاتم)', en: 'Haj Ahmad Kishko (Abu Hatem)' },
    role: { ar: 'مؤسس السلالة - الجد الأكبر', en: 'Dynasty Founder - Great Grandfather' },
    branchId: 'b1',
    birthYear: '1920',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    bio: {
      ar: 'عاش حياة حافلة بالعطاء والحكمة، حارس التراث والقصص الأولى لبيت كشكو.',
      en: 'Lived a life full of giving and wisdom, guardian of heritage and the early stories of the Kishko house.'
    }
  },
  {
    id: 'm2',
    name: { ar: 'الحاجة تمام عبدربه كشكو أم حاتم', en: 'Haja Tamam Abedrabbo Kishko Um Hatem' },
    role: { ar: 'أم العائلة ورمز الدفء', en: 'Mother of the Family & Symbol of Warmth' },
    branchId: 'b1',
    birthYear: '1928',
    photo: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=400&q=80',
    bio: {
      ar: 'حافظة الأغاني الشعبية ووصفات المطبخ العائلي الأصيل.',
      en: 'Keeper of folk songs and authentic family kitchen recipes.'
    }
  }
];

const INITIAL_PHOTOS = [
  {
    id: 'img-1',
    title: { ar: 'جلسة الشاي الصباحية في بيسان', en: 'Morning Tea Gathering in Beisan' },
    year: '1965',
    uploader: { ar: 'الجد رامي كشكو', en: 'Grandpa Rami Kishko' },
    album: { ar: 'أرشيف الأجداد', en: 'Ancestral Archive' },
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    description: { ar: 'صورة نادرة تجمع كبار العائلة في باحة الدار.', en: 'Rare photo bringing together senior family members in the courtyard.' },
    comments: [
      { id: 'c1', author: 'أحمد كشكو', text: 'رحمهم الله، كانت جلسات مباركة.', date: '2026-06-01' }
    ]
  }
];

const INITIAL_CATEGORIES = [
  { ar: 'الكل', en: 'All' },
  { ar: 'قصص الأجداد', en: 'Ancestral Stories' },
  { ar: 'التراث والتقاليد', en: 'Heritage & Traditions' },
  { ar: 'الوصفات والمأكولات', en: 'Recipes & Cuisine' },
  { ar: 'ذكريات السفر', en: 'Travel Memories' },
  { ar: 'مناسبات وأفراح', en: 'Events & Celebrations' }
];

export default function App() {
  const [lang, setLang] = useState('ar');
  const t = TRANSLATIONS[lang];

  const [user, setUser] = useState(null);
  const [isCloudConnected, setIsCloudConnected] = useState(false);

  const [stories, setStories] = useState(INITIAL_STORIES);
  const [branches, setBranches] = useState(FAMILY_BRANCHES);
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [siteCustomTitle, setSiteCustomTitle] = useState('');
  const [socialLinks, setSocialLinks] = useState({
    whatsapp: 'https://wa.me/1234567890',
    facebook: 'https://facebook.com',
    donate: 'https://paypal.me'
  });
  const [members, setMembers] = useState(INITIAL_FAMILY_MEMBERS);
  const [photos, setPhotos] = useState(INITIAL_PHOTOS);

  const [saveNotification, setSaveNotification] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Fixed missing activeTab state
  const [activeTab, setActiveTab] = useState('feed');

  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPin, setAdminPin] = useState('1234');
  const [showPinModal, setShowPinModal] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState(false);

  // Change PIN states
  const [showChangePinModal, setShowChangePinModal] = useState(false);
  const [currentPinInput, setCurrentPinInput] = useState('');
  const [newPinInput, setNewPinInput] = useState('');
  const [confirmPinInput, setConfirmPinInput] = useState('');
  const [pinChangeMsg, setPinChangeMsg] = useState({ text: '', error: false });

  // Photo comments modal state
  const [activePhotoComments, setActivePhotoComments] = useState(null);
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentText, setCommentText] = useState('');

  const [selectedCategory, setSelectedCategory] = useState({ ar: 'الكل', en: 'All' });
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [modalType, setModalType] = useState('story');
  const [editingItem, setEditingItem] = useState(null);

  const [newStory, setNewStory] = useState({
    title: { ar: '', en: '' },
    author: { ar: '', en: '' },
    category: { ar: 'قصص الأجداد', en: 'Ancestral Stories' },
    branchId: 'b1',
    date: new Date().getFullYear().toString(),
    content: { ar: '', en: '' },
    image: '',
    tags: ''
  });

  const [newPhotoItem, setNewPhotoItem] = useState({
    title: { ar: '', en: '' },
    year: new Date().getFullYear().toString(),
    uploader: { ar: '', en: '' },
    album: { ar: 'أرشيف العائلة', en: 'Family Archive' },
    url: '',
    description: { ar: '', en: '' }
  });

  const [newBranch, setNewBranch] = useState({ name: { ar: '', en: '' }, description: { ar: '', en: '' } });
  const [newMemberItem, setNewMemberItem] = useState({
    name: { ar: '', en: '' },
    role: { ar: '', en: '' },
    branchId: 'b1',
    birthYear: '',
    photo: '',
    bio: { ar: '', en: '' }
  });
  const [tempLinks, setTempLinks] = useState({ whatsapp: '', facebook: '', donate: '' });
  const [tempCategoriesInput, setTempCategoriesInput] = useState('');
  const [tempSiteTitle, setTempSiteTitle] = useState('');

  // 1. Authenticate with Cloud Database
  useEffect(() => {
    if (!auth) return;
    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (err) {
        console.error('Auth error:', err);
      }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  // 2. Real-time Shared Cloud Sync Listener (Public Shared Artifact Data)
  useEffect(() => {
    if (!user || !db) return;
    const sharedDocRef = doc(db, 'artifacts', appId, 'public', 'data', 'familyArchive', 'main');

    const unsubscribe = onSnapshot(
      sharedDocRef,
      (snapshot) => {
        setIsCloudConnected(true);
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (data.stories) setStories(data.stories);
          if (data.branches) setBranches(data.branches);
          if (data.categories) setCategories(data.categories);
          if (data.socialLinks) setSocialLinks(data.socialLinks);
          if (data.members) setMembers(data.members);
          if (data.photos) setPhotos(data.photos);
          if (data.adminPin) setAdminPin(data.adminPin);
          if (typeof data.siteCustomTitle === 'string') setSiteCustomTitle(data.siteCustomTitle);
        } else {
          // Initialize cloud document on first visit if empty
          setDoc(sharedDocRef, {
            stories: INITIAL_STORIES,
            branches: FAMILY_BRANCHES,
            categories: INITIAL_CATEGORIES,
            socialLinks: {
              whatsapp: 'https://wa.me/1234567890',
              facebook: 'https://facebook.com',
              donate: 'https://paypal.me'
            },
            members: INITIAL_FAMILY_MEMBERS,
            photos: INITIAL_PHOTOS,
            adminPin: '1234',
            siteCustomTitle: '',
            updatedAt: Date.now()
          }).catch((e) => console.error('Initial seed error:', e));
        }
      },
      (error) => {
        console.error('Snapshot error:', error);
        setIsCloudConnected(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  // Helper to push updates directly to shared cloud state
  const syncToCloud = async (overrides = {}, showToast = false) => {
    const payload = {
      stories: overrides.stories !== undefined ? overrides.stories : stories,
      branches: overrides.branches !== undefined ? overrides.branches : branches,
      categories: overrides.categories !== undefined ? overrides.categories : categories,
      socialLinks: overrides.socialLinks !== undefined ? overrides.socialLinks : socialLinks,
      members: overrides.members !== undefined ? overrides.members : members,
      photos: overrides.photos !== undefined ? overrides.photos : photos,
      adminPin: overrides.adminPin !== undefined ? overrides.adminPin : adminPin,
      siteCustomTitle: overrides.siteCustomTitle !== undefined ? overrides.siteCustomTitle : siteCustomTitle,
      updatedAt: Date.now()
    };

    if (user && db) {
      try {
        const sharedDocRef = doc(db, 'artifacts', appId, 'public', 'data', 'familyArchive', 'main');
        await setDoc(sharedDocRef, payload);
        if (showToast) {
          setToastMessage(t.savedSuccessToast);
          setSaveNotification(true);
          setTimeout(() => setSaveNotification(false), 3000);
        }
      } catch (err) {
        console.error('Cloud save error:', err);
      }
    } else if (showToast) {
      setToastMessage(t.savedSuccessToast);
      setSaveNotification(true);
      setTimeout(() => setSaveNotification(false), 3000);
    }
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleAdminAuth = (e) => {
    e.preventDefault();
    if (enteredPin === adminPin) {
      setIsAdmin(true);
      setShowPinModal(false);
      setEnteredPin('');
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleChangePinSubmit = (e) => {
    e.preventDefault();
    if (currentPinInput !== adminPin) {
      setPinChangeMsg({ text: t.wrongCurrentPin, error: true });
      return;
    }
    if (newPinInput !== confirmPinInput || !newPinInput) {
      setPinChangeMsg({ text: t.pinMismatch, error: true });
      return;
    }
    setAdminPin(newPinInput);
    syncToCloud({ adminPin: newPinInput }, false);
    setPinChangeMsg({ text: t.pinChangedSuccess, error: false });
    setTimeout(() => {
      setShowChangePinModal(false);
      setCurrentPinInput('');
      setNewPinInput('');
      setConfirmPinInput('');
      setPinChangeMsg({ text: '', error: false });
    }, 1500);
  };

  const handleAddComment = (photoId, e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    const newCommentObj = {
      id: `comment_${Date.now()}`,
      author: commentAuthor.trim() || (lang === 'ar' ? 'فرد من العائلة' : 'Family Member'),
      text: commentText.trim(),
      date: new Date().toISOString().split('T')[0]
    };
    const updatedPhotos = photos.map(p => {
      if (p.id === photoId) {
        const updatedComments = [...(p.comments || []), newCommentObj];
        return { ...p, comments: updatedComments };
      }
      return p;
    });
    setPhotos(updatedPhotos);
    syncToCloud({ photos: updatedPhotos }, false);
    // also update activePhotoComments view
    setActivePhotoComments(prev => ({
      ...prev,
      comments: [...(prev.comments || []), newCommentObj]
    }));
    setCommentText('');
  };

  const handleDeleteBranch = (id) => {
    if (!isAdmin || id === 'all') return;
    if (window.confirm(lang === 'ar' ? 'هل أنت تأكد من حذف هذا الفرع؟' : 'Are you sure you want to delete this branch?')) {
      const updatedBranches = branches.filter(b => b.id !== id);
      setBranches(updatedBranches);
      syncToCloud({ branches: updatedBranches }, true);
      if (selectedBranch === id) setSelectedBranch('all');
    }
  };

  const handleSaveBranch = (e) => {
    e.preventDefault();
    if (!isAdmin) return;
    if (!newBranch.name.ar.trim() && !newBranch.name.en.trim()) return;
    const createdBranch = {
      id: `b-${Date.now()}`,
      name: {
        ar: newBranch.name.ar || newBranch.name.en,
        en: newBranch.name.en || newBranch.name.ar
      },
      description: {
        ar: newBranch.description.ar || '',
        en: newBranch.description.en || ''
      }
    };
    const updatedBranches = [...branches, createdBranch];
    setBranches(updatedBranches);
    syncToCloud({ branches: updatedBranches }, true);
    setShowAddModal(false);
    resetForms();
  };

  const handleSaveLinks = (e) => {
    e.preventDefault();
    if (!isAdmin) return;
    setSocialLinks(tempLinks);
    syncToCloud({ socialLinks: tempLinks }, true);
    setShowAddModal(false);
  };

  const handleSaveCustomization = (e) => {
    e.preventDefault();
    if (!isAdmin) return;
    setSiteCustomTitle(tempSiteTitle);
    const catsArray = tempCategoriesInput.split(',').map(c => c.trim()).filter(Boolean);
    const updatedCats = catsArray.length > 0 ? catsArray.map(c => ({ ar: c, en: c })) : categories;
    if (catsArray.length > 0) {
      setCategories(updatedCats);
    }
    syncToCloud({ siteCustomTitle: tempSiteTitle, categories: updatedCats }, true);
    setShowAddModal(false);
  };

  const handleDeleteStory = (id) => {
    if (!isAdmin) return;
    if (window.confirm(lang === 'ar' ? 'هل أنت تأكد من إزالة هذه القصة؟' : 'Are you sure you want to remove this story?')) {
      const updatedStories = stories.filter(s => s.id !== id);
      setStories(updatedStories);
      syncToCloud({ stories: updatedStories }, true);
    }
  };

  const handleDeletePhoto = (id) => {
    if (!isAdmin) return;
    if (window.confirm(t.deletePhotoConfirm)) {
      const updatedPhotos = photos.filter(p => p.id !== id);
      setPhotos(updatedPhotos);
      syncToCloud({ photos: updatedPhotos }, true);
    }
  };

  const handleSaveStory = (e) => {
    e.preventDefault();
    if (!isAdmin) return;
    let updatedStories;
    if (editingItem) {
      updatedStories = stories.map(s => s.id === editingItem.id ? { ...editingItem } : s);
      setStories(updatedStories);
      setEditingItem(null);
    } else {
      const created = {
        id: `story-${Date.now()}`,
        title: { ar: newStory.title.ar, en: newStory.title.en || newStory.title.ar },
        author: { ar: newStory.author.ar, en: newStory.author.en || newStory.author.ar },
        category: newStory.category,
        branchId: newStory.branchId,
        date: newStory.date || '2026',
        content: { ar: newStory.content.ar, en: newStory.content.en || newStory.content.ar },
        image: newStory.image || 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
        audioUrl: null,
        likes: 0
      };
      updatedStories = [created, ...stories];
      setStories(updatedStories);
    }
    syncToCloud({ stories: updatedStories }, true);
    setShowAddModal(false);
    resetForms();
  };

  const handleSavePhoto = (e) => {
    e.preventDefault();
    if (!isAdmin) return;
    let updatedPhotos;
    if (editingItem) {
      updatedPhotos = photos.map(p => p.id === editingItem.id ? { ...editingItem } : p);
      setPhotos(updatedPhotos);
      setEditingItem(null);
    } else {
      const createdPhoto = {
        id: `img-${Date.now()}`,
        title: { ar: newPhotoItem.title.ar, en: newPhotoItem.title.en || newPhotoItem.title.ar },
        year: newPhotoItem.year || '2026',
        uploader: { ar: newPhotoItem.uploader.ar || 'فرد من العائلة', en: newPhotoItem.uploader.en || 'Family Member' },
        album: { ar: 'أرشيف العائلة', en: 'Family Archive' },
        url: newPhotoItem.url || 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
        description: { ar: newPhotoItem.description.ar, en: newPhotoItem.description.en || newPhotoItem.description.ar }
      };
      updatedPhotos = [createdPhoto, ...photos];
      setPhotos(updatedPhotos);
    }
    syncToCloud({ photos: updatedPhotos }, true);
    setShowAddModal(false);
    resetForms();
  };

  const handleSaveMember = (e) => {
    e.preventDefault();
    if (!isAdmin) return;
    let updatedMembers;
    if (editingItem) {
      updatedMembers = members.map(m => m.id === editingItem.id ? { ...editingItem } : m);
      setMembers(updatedMembers);
      setEditingItem(null);
    } else {
      if (!newMemberItem.name.ar.trim() && !newMemberItem.name.en.trim()) return;
      const createdMember = {
        id: `m-${Date.now()}`,
        name: {
          ar: newMemberItem.name.ar || newMemberItem.name.en,
          en: newMemberItem.name.en || newMemberItem.name.ar
        },
        role: {
          ar: newMemberItem.role.ar || '',
          en: newMemberItem.role.en || newMemberItem.role.ar || ''
        },
        branchId: newMemberItem.branchId || 'b1',
        birthYear: newMemberItem.birthYear || '',
        photo: newMemberItem.photo || 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80',
        bio: {
          ar: newMemberItem.bio.ar || '',
          en: newMemberItem.bio.en || newMemberItem.bio.ar || ''
        }
      };
      updatedMembers = [...members, createdMember];
      setMembers(updatedMembers);
    }
    syncToCloud({ members: updatedMembers }, true);
    setShowAddModal(false);
    resetForms();
  };

  const handleDeleteMember = (id) => {
    if (!isAdmin) return;
    if (window.confirm(t.deleteMemberConfirm)) {
      const updatedMembers = members.filter(m => m.id !== id);
      setMembers(updatedMembers);
      syncToCloud({ members: updatedMembers }, true);
    }
  };

  const handleManualSaveAll = () => {
    syncToCloud({}, true);
  };

  // Export & Import JSON Backup for complete safety
  const handleExportBackup = () => {
    const backupData = {
      stories,
      branches,
      categories,
      socialLinks,
      members,
      photos,
      siteCustomTitle,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kishko-family-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportBackup = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        if (parsed.stories) setStories(parsed.stories);
        if (parsed.branches) setBranches(parsed.branches);
        if (parsed.categories) setCategories(parsed.categories);
        if (parsed.socialLinks) setSocialLinks(parsed.socialLinks);
        if (parsed.members) setMembers(parsed.members);
        if (parsed.photos) setPhotos(parsed.photos);
        if (typeof parsed.siteCustomTitle === 'string') setSiteCustomTitle(parsed.siteCustomTitle);

        syncToCloud(
          {
            stories: parsed.stories || stories,
            branches: parsed.branches || branches,
            categories: parsed.categories || categories,
            socialLinks: parsed.socialLinks || socialLinks,
            members: parsed.members || members,
            photos: parsed.photos || photos,
            siteCustomTitle: typeof parsed.siteCustomTitle === 'string' ? parsed.siteCustomTitle : siteCustomTitle
          },
          false
        );
        setToastMessage(t.backupImportedToast);
        setSaveNotification(true);
        setTimeout(() => setSaveNotification(false), 3000);
      } catch (err) {
        console.error('Invalid backup file:', err);
      }
    };
    reader.readAsText(file);
  };

  const resetForms = () => {
    setNewStory({
      title: { ar: '', en: '' },
      author: { ar: '', en: '' },
      category: categories[1] || { ar: 'قصص الأجداد', en: 'Ancestral Stories' },
      branchId: 'b1',
      date: '2026',
      content: { ar: '', en: '' },
      image: '',
      tags: ''
    });
    setNewPhotoItem({
      title: { ar: '', en: '' },
      year: '2026',
      uploader: { ar: '', en: '' },
      album: { ar: 'أرشيف', en: 'Archive' },
      url: '',
      description: { ar: '', en: '' }
    });
    setNewBranch({ name: { ar: '', en: '' }, description: { ar: '', en: '' } });
    setNewMemberItem({
      name: { ar: '', en: '' },
      role: { ar: '', en: '' },
      branchId: 'b1',
      birthYear: '',
      photo: '',
      bio: { ar: '', en: '' }
    });
    setEditingItem(null);
  };

  const handleQuickImageChange = (type, id) => {
    if (!isAdmin) return;
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = async (uploadEvent) => {
          const compressedUrl = await compressImageDataUrl(uploadEvent.target.result);
          if (type === 'story') {
            const updatedStories = stories.map(s => s.id === id ? { ...s, image: compressedUrl } : s);
            setStories(updatedStories);
            syncToCloud({ stories: updatedStories }, true);
          } else if (type === 'photo') {
            const updatedPhotos = photos.map(p => p.id === id ? { ...p, url: compressedUrl } : p);
            setPhotos(updatedPhotos);
            syncToCloud({ photos: updatedPhotos }, true);
          } else if (type === 'member') {
            const updatedMembers = members.map(m => m.id === id ? { ...m, photo: compressedUrl } : m);
            setMembers(updatedMembers);
            syncToCloud({ members: updatedMembers }, true);
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleFileUpload = (e, targetField, setterFunc) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (uploadEvent) => {
        const compressedUrl = await compressImageDataUrl(uploadEvent.target.result);
        setterFunc(prev => ({ ...prev, [targetField]: compressedUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditingItemFileUpload = (e, targetField) => {
    const file = e.target.files[0];
    if (file && editingItem) {
      const reader = new FileReader();
      reader.onload = async (uploadEvent) => {
        const compressedUrl = await compressImageDataUrl(uploadEvent.target.result);
        setEditingItem({ ...editingItem, [targetField]: compressedUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredStories = useMemo(() => {
    return stories.filter(story => {
      const currentCatName = typeof story.category === 'object' ? story.category[lang] || story.category.ar : story.category;
      const targetCatName = typeof selectedCategory === 'object' ? selectedCategory[lang] || selectedCategory.ar : selectedCategory;
      
      const matchesCategory = targetCatName === (lang === 'ar' ? 'الكل' : 'All') || currentCatName === targetCatName;
      const matchesBranch = selectedBranch === 'all' || story.branchId === selectedBranch;

      const titleText = (story.title[lang] || story.title.ar || '').toLowerCase();
      const contentText = (story.content[lang] || story.content.ar || '').toLowerCase();
      const authorText = (story.author[lang] || story.author.ar || '').toLowerCase();
      const q = searchQuery.toLowerCase();

      const matchesSearch = titleText.includes(q) || contentText.includes(q) || authorText.includes(q);
      return matchesCategory && matchesBranch && matchesSearch;
    });
  }, [stories, selectedCategory, selectedBranch, searchQuery, lang]);

  return (
    <div
      className={`min-h-screen relative overflow-x-hidden ${lang === 'ar' ? 'dir-rtl' : 'dir-ltr'} ${
        darkMode
          ? 'bg-stone-950 text-amber-50'
          : 'bg-[#FAF6F0] text-stone-800'
      } transition-colors duration-300 font-sans`}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* ARCHITECTURAL HERITAGE BACKGROUND TEXTURE & AMBIENT GLOW */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.04] dark:opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(#92400e 1px, transparent 1px), radial-gradient(#b45309 1px, #FAF6F0 1px)`,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px'
        }}
      />
      <div className="pointer-events-none fixed top-0 inset-x-0 h-[500px] bg-gradient-to-b from-amber-500/10 via-amber-700/5 to-transparent dark:from-amber-600/10 dark:via-stone-900/20 z-0" />

      {/* HEADER NAVBAR */}
      <header className={`sticky top-0 z-40 backdrop-blur-xl border-b ${darkMode ? 'bg-stone-950/85 border-amber-900/40' : 'bg-[#FAF6F0]/90 border-amber-200/70'} shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <div className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer group" onClick={() => setActiveTab('feed')}>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-800 via-amber-700 to-amber-600 flex items-center justify-center text-white shadow-lg shadow-amber-900/20 ring-2 ring-amber-300/60 group-hover:scale-105 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-amber-950 via-amber-800 to-amber-700 dark:from-amber-200 dark:via-amber-300 dark:to-amber-500 bg-clip-text text-transparent font-serif tracking-tight">
                {siteCustomTitle || t.siteTitle}
              </h1>
              <p className="text-xs text-amber-800/80 dark:text-amber-300/70 font-medium">{t.siteSubtitle}</p>
            </div>
          </div>

          {/* PAGE NAVIGATION TABS */}
          <nav className="hidden md:flex items-center space-x-1 rtl:space-x-reverse bg-white/80 dark:bg-stone-900/80 backdrop-blur-md p-1.5 rounded-full border border-amber-200/70 dark:border-stone-800 shadow-inner">
            <button
              onClick={() => setActiveTab('feed')}
              className={`flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === 'feed'
                  ? 'bg-gradient-to-r from-amber-800 to-amber-700 text-white shadow-md shadow-amber-900/20'
                  : 'text-stone-700 dark:text-stone-300 hover:text-amber-800 hover:bg-amber-50/70 dark:hover:bg-stone-800'
              }`}
            >
              <Feather className="w-4 h-4" />
              <span>{t.feedTab}</span>
            </button>

            <button
              onClick={() => setActiveTab('tree')}
              className={`flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === 'tree'
                  ? 'bg-gradient-to-r from-amber-800 to-amber-700 text-white shadow-md shadow-amber-900/20'
                  : 'text-stone-700 dark:text-stone-300 hover:text-amber-800 hover:bg-amber-50/70 dark:hover:bg-stone-800'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>{t.treeTab}</span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === 'gallery'
                  ? 'bg-gradient-to-r from-amber-800 to-amber-700 text-white shadow-md shadow-amber-900/20'
                  : 'text-stone-700 dark:text-stone-300 hover:text-amber-800 hover:bg-amber-50/70 dark:hover:bg-stone-800'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>{t.galleryTab}</span>
            </button>

            <button
              onClick={() => setActiveTab('about')}
              className={`flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === 'about'
                  ? 'bg-gradient-to-r from-amber-800 to-amber-700 text-white shadow-md shadow-amber-900/20'
                  : 'text-stone-700 dark:text-stone-300 hover:text-amber-800 hover:bg-amber-50/70 dark:hover:bg-stone-800'
              }`}
            >
              <HeartHandshake className="w-4 h-4" />
              <span>{t.aboutTab}</span>
            </button>
          </nav>

          {/* SOCIAL LINKS & ADMIN & LANGUAGE CONTROLS */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            
            {/* CLOUD SYNC STATUS BADGE */}
            <div
              className={`hidden xl:flex items-center space-x-1.5 rtl:space-x-reverse px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                isCloudConnected
                  ? 'bg-emerald-50/80 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                  : 'bg-amber-50 dark:bg-stone-800 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-stone-700'
              }`}
            >
              {isCloudConnected ? <Cloud className="w-3.5 h-3.5" /> : <CloudOff className="w-3.5 h-3.5" />}
              <span>{isCloudConnected ? t.cloudSynced : t.cloudOffline}</span>
            </div>

            {/* LANGUAGE SWITCHER BUTTON */}
            <button
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="flex items-center space-x-1.5 rtl:space-x-reverse px-3 py-1.5 rounded-full bg-amber-200/70 dark:bg-stone-800 text-amber-900 dark:text-amber-200 text-xs font-bold hover:bg-amber-300 transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
            </button>

            {/* ADMIN / VISITOR MODE TOGGLE */}
            {isAdmin ? (
              <div className="flex items-center space-x-2 rtl:space-x-reverse bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 px-3 py-1.5 rounded-full text-xs font-bold">
                <Unlock className="w-4 h-4 text-emerald-600" />
                <span className="hidden lg:inline">{t.adminMode}</span>
                <button
                  onClick={handleManualSaveAll}
                  className="bg-amber-700 hover:bg-amber-800 text-white px-2.5 py-1 rounded-full flex items-center gap-1 text-[11px] shadow-sm transition-all"
                  title={t.saveAllBtn}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{t.saveAllBtn}</span>
                </button>
                <button
                  onClick={() => setIsAdmin(false)}
                  className="mx-1 bg-emerald-700 text-white px-2 py-0.5 rounded-full hover:bg-emerald-800 text-[10px]"
                >
                  {t.lock}
                </button>
                <button
                  onClick={() => {
                    setShowChangePinModal(true);
                  }}
                  className="p-1 hover:text-emerald-900"
                  title={t.changePinBtn}
                >
                  <KeyRound className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    setTempSiteTitle(siteCustomTitle);
                    setTempCategoriesInput(categories.map(c => c[lang] || c.ar).join(', '));
                    setModalType('customize');
                    setShowAddModal(true);
                  }}
                  className="p-1 hover:text-emerald-900"
                  title={t.editCustomization}
                >
                  <Settings className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleExportBackup}
                  className="p-1 hover:text-emerald-900"
                  title={t.exportBackup}
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
                <label className="p-1 hover:text-emerald-900 cursor-pointer" title={t.importBackup}>
                  <Upload className="w-3.5 h-3.5" />
                  <input type="file" accept=".json" onChange={handleImportBackup} className="hidden" />
                </label>
              </div>
            ) : (
              <button
                onClick={() => setShowPinModal(true)}
                className="flex items-center space-x-1.5 rtl:space-x-reverse bg-stone-200 dark:bg-stone-800 hover:bg-amber-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
              >
                <Lock className="w-3.5 h-3.5 text-stone-500" />
                <span>{t.editorLogin}</span>
              </button>
            )}

            {isAdmin && (
              <button
                onClick={() => { resetForms(); setModalType('story'); setShowAddModal(true); }}
                className="flex items-center space-x-2 rtl:space-x-reverse bg-gradient-to-r from-amber-700 to-amber-800 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md hover:from-amber-800 hover:to-amber-900 transition-all"
              >
                <PlusCircle className="w-4 h-4" />
                <span className="hidden sm:inline">{t.addNew}</span>
              </button>
            )}

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2.5 rounded-full transition-colors ${
                darkMode ? 'bg-stone-800 text-amber-300' : 'bg-amber-100 text-amber-900'
              }`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* SAVE SUCCESS TOAST */}
      {saveNotification && (
        <div className="fixed bottom-6 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 z-50 bg-emerald-700 text-white px-6 py-3 rounded-full shadow-xl flex items-center space-x-2 rtl:space-x-reverse text-sm font-bold animate-bounce">
          <Check className="w-5 h-5" />
          <span>{toastMessage || t.savedSuccessToast}</span>
        </div>
      )}

      {/* LUXURY HERO SHOWCASE BANNER */}
      <section className="relative z-10 overflow-hidden pt-10 pb-12 border-b border-amber-200/50 dark:border-stone-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-amber-950 via-stone-900 to-amber-900 text-white shadow-2xl border border-amber-500/30 p-8 sm:p-12 lg:p-14">
            {/* Decorative Background Pattern Overlay inside Hero */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                mixBlendMode: 'luminosity'
              }}
            />
            <div className="absolute -top-24 -end-24 w-80 h-80 rounded-full bg-amber-500/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -start-24 w-80 h-80 rounded-full bg-amber-600/20 blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto text-center space-y-5">
              <span className="inline-flex items-center space-x-2 rtl:space-x-reverse px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-200 text-xs font-semibold backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{isAdmin ? t.bannerBadge : t.bannerWelcome}</span>
              </span>

              <h2 className="text-3xl sm:text-5xl font-extrabold font-serif tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-white to-amber-200">
                {siteCustomTitle || t.bannerTitle}
              </h2>

              <p className="text-sm sm:text-base text-amber-100/80 max-w-2xl mx-auto leading-relaxed">
                {lang === 'ar'
                  ? 'صرح رقمي يجمع سيرة الأجداد، شجرة العائلة، وألبوم الذكريات الخالدة لتبقى حكايات بيت كشكو حية عبر الأجيال.'
                  : 'A digital sanctuary preserving ancestral biographies, the family tree, and timeless photo memories so the legacy of the Kishko house lives across generations.'}
              </p>

              {/* Quick Action Buttons in Hero */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => setActiveTab('tree')}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-950/50 transition-all flex items-center space-x-2 rtl:space-x-reverse"
                >
                  <Users className="w-4 h-4" />
                  <span>{t.treeTab}</span>
                </button>
                <button
                  onClick={() => setActiveTab('gallery')}
                  className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm backdrop-blur-md transition-all flex items-center space-x-2 rtl:space-x-reverse"
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>{t.galleryTab}</span>
                </button>
              </div>
            </div>

            {/* Live Heritage Stats Bar */}
            <div className="relative z-10 mt-10 pt-8 border-t border-white/10 grid grid-cols-3 gap-4 max-w-2xl mx-auto text-center">
              <div className="p-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-serif">{members.length}</div>
                <div className="text-[11px] sm:text-xs text-amber-100/75 mt-1">
                  {lang === 'ar' ? 'أفراد الشجرة' : 'Family Members'}
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-serif">{stories.length}</div>
                <div className="text-[11px] sm:text-xs text-amber-100/75 mt-1">
                  {lang === 'ar' ? 'قصة موثقة' : 'Documented Stories'}
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-serif">{photos.length}</div>
                <div className="text-[11px] sm:text-xs text-amber-100/75 mt-1">
                  {lang === 'ar' ? 'صورة أرشيفية' : 'Archive Photos'}
                </div>
              </div>
            </div>
          </div>

          {/* MOBILE NAVIGATION BAR */}
          <div className="flex md:hidden items-center justify-between gap-1.5 mt-6 bg-white/90 dark:bg-stone-900/90 p-1.5 rounded-2xl border border-amber-200/70 dark:border-stone-800 shadow-sm overflow-x-auto">
            {[
              { id: 'feed', label: t.feedTab, icon: Feather },
              { id: 'tree', label: t.treeTab, icon: Users },
              { id: 'gallery', label: t.galleryTab, icon: ImageIcon },
              { id: 'about', label: t.aboutTab, icon: HeartHandshake }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-1.5 rtl:space-x-reverse px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-amber-800 text-white shadow-sm'
                      : 'text-stone-600 dark:text-stone-300'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* LUXURY FAMILY BRANCHES SHOWCASE GRID */}
        <section className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div className="flex items-center space-x-2.5 rtl:space-x-reverse">
              <div className="w-9 h-9 rounded-xl bg-amber-800/10 dark:bg-amber-500/15 border border-amber-300/60 dark:border-amber-700/40 flex items-center justify-center text-amber-800 dark:text-amber-300">
                <FolderGit2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-extrabold font-serif text-stone-900 dark:text-amber-100">
                  {t.filterBranch}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {lang === 'ar'
                    ? 'اختر الفرع العائلي لاستعراض أفراده وقصصه الموثقة'
                    : 'Select a family branch to explore its members and documented stories'}
                </p>
              </div>
            </div>

            {isAdmin && (
              <button
                onClick={() => { resetForms(); setModalType('branch'); setShowAddModal(true); }}
                className="self-start sm:self-auto px-4 py-2 bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 rtl:space-x-reverse shadow-md shadow-emerald-950/20 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>{t.addBranch}</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {branches.map((branch, idx) => {
              const bName = typeof branch.name === 'object' ? branch.name[lang] || branch.name.ar : branch.name;
              const bDesc = typeof branch.description === 'object'
                ? (branch.description[lang] || branch.description.ar)
                : (branch.description || '');
              const isSelected = selectedBranch === branch.id;

              const branchMembersCount = branch.id === 'all'
                ? members.length
                : members.filter(m => m.branchId === branch.id).length;

              const branchStoriesCount = branch.id === 'all'
                ? stories.length
                : stories.filter(s => s.branchId === branch.id).length;

              return (
                <div
                  key={branch.id}
                  onClick={() => setSelectedBranch(branch.id)}
                  className={`relative cursor-pointer rounded-2xl p-5 transition-all duration-300 border flex flex-col justify-between group ${
                    isSelected
                      ? 'bg-gradient-to-br from-amber-900 via-amber-800 to-stone-900 text-white border-amber-500 shadow-xl shadow-amber-950/20 -translate-y-0.5'
                      : 'bg-white/90 dark:bg-stone-900/90 backdrop-blur-md text-stone-800 dark:text-amber-50 border-amber-200/70 dark:border-stone-800 hover:border-amber-400 dark:hover:border-amber-700 hover:shadow-md'
                  }`}
                >
                  {/* Decorative Corner Accent */}
                  <div
                    className={`absolute top-0 end-0 w-20 h-20 rounded-bl-full pointer-events-none transition-opacity ${
                      isSelected ? 'bg-amber-400/10' : 'bg-amber-500/5 opacity-0 group-hover:opacity-100'
                    }`}
                  />

                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-serif font-extrabold text-sm shadow-inner ${
                          isSelected
                            ? 'bg-amber-400/20 text-amber-200 border border-amber-400/30'
                            : 'bg-amber-100/80 dark:bg-stone-800 text-amber-800 dark:text-amber-300 border border-amber-200/60 dark:border-stone-700'
                        }`}
                      >
                        {branch.id === 'all' ? <Sparkles className="w-5 h-5" /> : `0${idx}`}
                      </div>

                      <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
                        {isSelected && (
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 border border-amber-300/30 text-amber-200 text-[10px] font-bold">
                            {lang === 'ar' ? 'نشط' : 'Active'}
                          </span>
                        )}
                        {isAdmin && branch.id !== 'all' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteBranch(branch.id);
                            }}
                            className={`p-1.5 rounded-lg transition-colors ${
                              isSelected
                                ? 'text-rose-200 hover:bg-rose-500/30'
                                : 'text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-950/50'
                            }`}
                            title={t.deleteBranch}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    <h4
                      className={`font-bold font-serif text-base leading-snug mb-1.5 ${
                        isSelected ? 'text-amber-100' : 'text-stone-900 dark:text-amber-100'
                      }`}
                    >
                      {bName}
                    </h4>

                    {bDesc && (
                      <p
                        className={`text-xs leading-relaxed line-clamp-2 ${
                          isSelected ? 'text-amber-100/80' : 'text-stone-500 dark:text-stone-400'
                        }`}
                      >
                        {bDesc}
                      </p>
                    )}
                  </div>

                  {/* Branch Counters Footer */}
                  <div
                    className={`mt-4 pt-3 border-t flex items-center justify-between text-[11px] font-semibold ${
                      isSelected
                        ? 'border-white/15 text-amber-200'
                        : 'border-amber-100 dark:border-stone-800 text-stone-600 dark:text-stone-400'
                    }`}
                  >
                    <span className="flex items-center space-x-1 rtl:space-x-reverse">
                      <Users className="w-3.5 h-3.5 opacity-80" />
                      <span>
                        {branchMembersCount} {lang === 'ar' ? 'أفراد' : 'Members'}
                      </span>
                    </span>
                    <span className="flex items-center space-x-1 rtl:space-x-reverse">
                      <BookOpen className="w-3.5 h-3.5 opacity-80" />
                      <span>
                        {branchStoriesCount} {lang === 'ar' ? 'قصص' : 'Stories'}
                      </span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* TAB 1: STORY FEED */}
        {activeTab === 'feed' && (
          <div className="space-y-6">
            
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white dark:bg-stone-900 p-4 rounded-2xl border border-amber-200/60 dark:border-stone-800 shadow-sm">
              <div className="relative w-full md:w-80">
                <Search className="w-5 h-5 absolute start-3.5 top-3 text-amber-700/60 dark:text-amber-400/60" />
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-10 py-2 rounded-xl border border-amber-200 dark:border-stone-700 bg-amber-50/30 dark:bg-stone-800 text-sm focus:outline-none"
                />
              </div>

              <div className="flex items-center space-x-2 rtl:space-x-reverse overflow-x-auto w-full md:w-auto">
                <Filter className="w-4 h-4 text-amber-700 dark:text-amber-400 mx-1 shrink-0" />
                {categories.map((cat, idx) => {
                  const catLabel = typeof cat === 'object' ? cat[lang] || cat.ar : cat;
                  const currentSelectedCatLabel = typeof selectedCategory === 'object' ? selectedCategory[lang] || selectedCategory.ar : selectedCategory;
                  const isSelected = currentSelectedCatLabel === catLabel;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1 rounded-xl text-xs font-medium whitespace-nowrap ${
                        isSelected ? 'bg-amber-800 text-white' : 'bg-amber-100/60 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                      }`}
                    >
                      {catLabel}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STORIES GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStories.map((story) => {
                const sTitle = typeof story.title === 'object' ? story.title[lang] || story.title.ar : story.title;
                const sAuthor = typeof story.author === 'object' ? story.author[lang] || story.author.ar : story.author;
                const sCat = typeof story.category === 'object' ? story.category[lang] || story.category.ar : story.category;
                const sContent = typeof story.content === 'object' ? story.content[lang] || story.content.ar : story.content;

                return (
                  <article
                    key={story.id}
                    className="bg-white dark:bg-stone-900 rounded-2xl overflow-hidden border border-amber-200/60 dark:border-stone-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group relative"
                  >
                    <div>
                      <div className="relative h-48 overflow-hidden bg-amber-100 dark:bg-stone-800 group">
                        <img
                          src={story.image}
                          alt={sTitle}
                          className="w-full h-full object-cover"
                        />
                        {isAdmin && (
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2 rtl:space-x-reverse">
                            <button
                              onClick={() => handleQuickImageChange('story', story.id)}
                              className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 shadow-md"
                            >
                              <Camera className="w-4 h-4" />
                              <span>{t.changePhoto}</span>
                            </button>
                          </div>
                        )}

                        <span className="absolute top-3 end-3 bg-white/90 dark:bg-stone-900/90 text-amber-900 dark:text-amber-200 text-xs px-2.5 py-1 rounded-full font-medium">
                          {sCat}
                        </span>
                      </div>

                      <div className="p-5">
                        <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                          <div className="flex items-center space-x-1 rtl:space-x-reverse">
                            <Calendar className="w-3.5 h-3.5 text-amber-700" />
                            <span>{story.date}</span>
                            <span>•</span>
                            <User className="w-3.5 h-3.5 text-amber-700" />
                            <span>{sAuthor}</span>
                          </div>

                          {isAdmin && (
                            <div className="flex items-center space-x-1 rtl:space-x-reverse">
                              <button
                                onClick={() => { setEditingItem(story); setModalType('story'); setShowAddModal(true); }}
                                className="p-1 hover:bg-amber-100 dark:hover:bg-stone-800 rounded text-amber-800 dark:text-amber-300"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteStory(story.id)}
                                className="p-1 hover:bg-rose-100 dark:hover:bg-rose-900/40 rounded text-rose-600"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>

                        <h4 className="text-lg font-bold font-serif text-stone-900 dark:text-amber-100 mb-2 leading-snug">
                          {sTitle}
                        </h4>

                        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-4">
                          {sContent}
                        </p>
                      </div>
                    </div>

                    <div className="px-5 py-3 bg-amber-50/40 dark:bg-stone-800/40 border-t border-amber-100 dark:border-stone-800 flex items-center justify-between">
                      <button
                        onClick={() => {
                          const updatedStories = stories.map(s => s.id === story.id ? { ...s, likes: s.likes + 1 } : s);
                          setStories(updatedStories);
                          syncToCloud({ stories: updatedStories }, false);
                        }}
                        className="flex items-center space-x-1 rtl:space-x-reverse text-xs font-semibold text-rose-600"
                      >
                        <Heart className="w-4 h-4 fill-current" />
                        <span>{story.likes} {t.likes}</span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

          </div>
        )}

        {/* TAB 2: FAMILY TREE & MEMBERS EDIT */}
        {activeTab === 'tree' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold font-serif text-stone-900 dark:text-amber-100">
                {t.familyTreeTitle}
              </h3>
              {isAdmin && (
                <button
                  onClick={() => { resetForms(); setModalType('member'); setShowAddModal(true); }}
                  className="flex items-center space-x-2 rtl:space-x-reverse bg-amber-800 hover:bg-amber-900 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition-all"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>{t.addMemberBtn}</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {members
                .filter(m => selectedBranch === 'all' || m.branchId === selectedBranch)
                .map(member => {
                const mName = typeof member.name === 'object' ? member.name[lang] || member.name.ar : member.name;
                const mRole = typeof member.role === 'object' ? member.role[lang] || member.role.ar : member.role;
                const mBio = typeof member.bio === 'object' ? member.bio[lang] || member.bio.ar : member.bio;

                return (
                  <div 
                    key={member.id}
                    className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-amber-200/80 dark:border-stone-800 shadow-sm flex items-start space-x-4 rtl:space-x-reverse relative group"
                  >
                    <div className="relative group/img">
                      <img
                        src={member.photo}
                        alt={mName}
                        className="w-16 h-16 rounded-full object-cover border-2 border-amber-500 shadow-sm shrink-0"
                      />
                      {isAdmin && (
                        <button
                          onClick={() => handleQuickImageChange('member', member.id)}
                          className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover/img:opacity-100 flex items-center justify-center text-white text-[10px]"
                        >
                          <Camera className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h5 className="font-bold text-stone-900 dark:text-amber-100 text-base">{mName}</h5>
                        {isAdmin && (
                          <div className="flex items-center space-x-1 rtl:space-x-reverse">
                            <button
                              onClick={() => { setEditingItem(member); setModalType('member'); setShowAddModal(true); }}
                              className="p-1 hover:bg-amber-100 dark:hover:bg-stone-800 rounded text-amber-800 dark:text-amber-300"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteMember(member.id)}
                              className="p-1 hover:bg-rose-100 dark:hover:bg-rose-900/40 rounded text-rose-600"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                      <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mt-0.5">
                        {mRole} {member.birthYear ? `(${member.birthYear})` : ''}
                      </p>
                      <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">{mBio}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: PHOTO GALLERY */}
        {activeTab === 'gallery' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold font-serif text-stone-900 dark:text-amber-100">
                {t.galleryTitle}
              </h3>
              {isAdmin && (
                <button
                  onClick={() => { resetForms(); setModalType('photo'); setShowAddModal(true); }}
                  className="flex items-center space-x-2 rtl:space-x-reverse bg-amber-800 text-white px-4 py-2 rounded-xl text-xs font-bold"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>{t.addPhoto}</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {photos.map(photo => {
                const pTitle = typeof photo.title === 'object' ? photo.title[lang] || photo.title.ar : photo.title;
                const pDesc = typeof photo.description === 'object' ? photo.description[lang] || photo.description.ar : photo.description;
                const commentsCount = (photo.comments || []).length;

                return (
                  <div 
                    key={photo.id}
                    className="bg-white dark:bg-stone-900 rounded-2xl overflow-hidden border border-amber-200/60 dark:border-stone-800 shadow-sm group flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-56 overflow-hidden bg-stone-800">
                        <img 
                          src={photo.url} 
                          alt={pTitle}
                          className="w-full h-full object-cover"
                        />
                        {isAdmin && (
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2 rtl:space-x-reverse">
                            <button
                              onClick={() => handleQuickImageChange('photo', photo.id)}
                              className="bg-amber-600 text-white p-2 rounded-lg text-xs font-bold"
                            >
                              <Camera className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeletePhoto(photo.id)}
                              className="bg-rose-600 text-white p-2 rounded-lg text-xs font-bold"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="p-4">
                        <h5 className="font-bold font-serif text-stone-900 dark:text-amber-100 text-sm">{pTitle}</h5>
                        <p className="text-xs text-stone-500 mt-1">{pDesc}</p>
                      </div>
                    </div>

                    <div className="px-4 py-3 bg-amber-50/40 dark:bg-stone-800/40 border-t border-amber-100 dark:border-stone-800 flex items-center justify-between">
                      <button
                        onClick={() => setActivePhotoComments(photo)}
                        className="flex items-center space-x-1.5 rtl:space-x-reverse text-xs font-semibold text-amber-800 dark:text-amber-300 hover:underline"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>{commentsCount} {t.commentsTitle}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: ABOUT / DONATION */}
        {activeTab === 'about' && (
          <div className="max-w-2xl mx-auto bg-white dark:bg-stone-900 p-8 rounded-3xl border border-amber-200/60 dark:border-stone-800 shadow-sm space-y-6 text-center">
            <h3 className="text-2xl font-bold font-serif text-stone-900 dark:text-amber-100">
              {t.donationTitle}
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              {t.donationDesc}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <a
                href={socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 flex flex-col items-center justify-center space-y-2 hover:bg-emerald-100 transition-colors"
              >
                <Facebook className="w-6 h-6" />
                <span className="font-bold text-xs">{t.whatsapp}</span>
              </a>

              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200 flex flex-col items-center justify-center space-y-2 hover:bg-blue-100 transition-colors"
              >
                <Facebook className="w-6 h-6" />
                <span className="font-bold text-xs">{t.facebook}</span>
              </a>

              <a
                href={socialLinks.donate}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 flex flex-col items-center justify-center space-y-2 hover:bg-amber-100 transition-colors"
              >
                <Heart className="w-6 h-6" />
                <span className="font-bold text-xs">{t.donate}</span>
              </a>
            </div>
          </div>
        )}

      </main>

      {/* PHOTO COMMENTS MODAL */}
      {activePhotoComments && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-stone-900 w-full max-w-lg rounded-3xl border border-amber-200 dark:border-stone-800 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            
            <div className="px-6 py-4 border-b border-amber-100 dark:border-stone-800 flex justify-between items-center bg-amber-50/50 dark:bg-stone-800/50">
              <h4 className="font-bold text-amber-900 dark:text-amber-200 text-sm">
                {t.commentsTitle}
              </h4>
              <button onClick={() => setActivePhotoComments(null)} className="text-stone-400 hover:text-stone-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="rounded-xl overflow-hidden h-40 bg-stone-800 mb-4">
                <img src={activePhotoComments.url} alt="" className="w-full h-full object-cover" />
              </div>

              <div className="space-y-3">
                {(!activePhotoComments.comments || activePhotoComments.comments.length === 0) ? (
                  <p className="text-xs text-stone-500 text-center py-4">{lang === 'ar' ? 'لا توجد تعليقات بعد. كن أول المضيفين!' : 'No comments yet. Be the first to comment!'}</p>
                ) : (
                  activePhotoComments.comments.map(c => (
                    <div key={c.id} className="bg-amber-50/60 dark:bg-stone-800/60 p-3 rounded-xl border border-amber-200/50 dark:border-stone-700 text-xs">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-amber-900 dark:text-amber-200">{c.author}</span>
                        <span className="text-[10px] text-stone-400">{c.date}</span>
                      </div>
                      <p className="text-stone-700 dark:text-stone-300">{c.text}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            <form onSubmit={(e) => handleAddComment(activePhotoComments.id, e)} className="p-4 bg-amber-50/30 dark:bg-stone-800/40 border-t border-amber-100 dark:border-stone-800 space-y-2">
              <input
                type="text"
                placeholder={t.commentAuthorPlaceholder}
                value={commentAuthor}
                onChange={(e) => setCommentAuthor(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-amber-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder={t.addCommentPlaceholder}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl border border-amber-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs"
                />
                <button type="submit" className="px-4 py-2 bg-amber-800 text-white rounded-xl text-xs font-bold">
                  {t.sendComment}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* CHANGE PIN MODAL */}
      {showChangePinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-stone-900 w-full max-w-sm rounded-3xl border border-amber-200 dark:border-stone-800 p-6 shadow-2xl text-center">
            <div className="w-12 h-12 bg-amber-100 dark:bg-stone-800 text-amber-800 dark:text-amber-300 rounded-full flex items-center justify-center mx-auto mb-3">
              <KeyRound className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-stone-900 dark:text-amber-100 text-lg mb-4">{t.changePinModalTitle}</h4>

            <form onSubmit={handleChangePinSubmit} className="space-y-3 text-start">
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">{t.currentPinLabel}</label>
                <input
                  type="password"
                  required
                  maxLength={6}
                  value={currentPinInput}
                  onChange={(e) => setCurrentPinInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-amber-300 dark:border-stone-700 bg-amber-50/40 dark:bg-stone-800 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">{t.newPinLabel}</label>
                <input
                  type="password"
                  required
                  maxLength={6}
                  value={newPinInput}
                  onChange={(e) => setNewPinInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-amber-300 dark:border-stone-700 bg-amber-50/40 dark:bg-stone-800 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">{t.confirmPinLabel}</label>
                <input
                  type="password"
                  required
                  maxLength={6}
                  value={confirmPinInput}
                  onChange={(e) => setConfirmPinInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-amber-300 dark:border-stone-700 bg-amber-50/40 dark:bg-stone-800 text-xs"
                />
              </div>

              {pinChangeMsg.text && (
                <p className={`text-xs font-bold text-center ${pinChangeMsg.error ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {pinChangeMsg.text}
                </p>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowChangePinModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-xs font-bold"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-amber-800 text-white text-xs font-bold"
                >
                  {t.saveChanges}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* LOGIN PIN MODAL */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-stone-900 w-full max-w-sm rounded-3xl border border-amber-200 dark:border-stone-800 p-6 shadow-2xl text-center">
            <div className="w-12 h-12 bg-amber-100 dark:bg-stone-800 text-amber-800 dark:text-amber-300 rounded-full flex items-center justify-center mx-auto mb-3">
              <Lock className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-stone-900 dark:text-amber-100 text-lg mb-1">{t.adminPinTitle}</h4>
            <p className="text-xs text-stone-500 mb-4">{t.adminPinDesc}</p>

            <form onSubmit={handleAdminAuth} className="space-y-3 text-start">
              <input
                type="password"
                required
                maxLength={6}
                placeholder="PIN (1234)"
                value={enteredPin}
                onChange={(e) => setEnteredPin(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-amber-300 dark:border-stone-700 bg-amber-50/40 dark:bg-stone-800 text-center tracking-widest text-lg font-bold"
              />

              {pinError && (
                <p className="text-xs font-bold text-rose-600 text-center">{t.wrongPin}</p>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => { setShowPinModal(false); setEnteredPin(''); setPinError(false); }}
                  className="flex-1 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-xs font-bold"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-amber-800 text-white text-xs font-bold"
                >
                  {t.confirmLogin}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL FOR ADDING AND EDITING CONTENT & BRANCHES & CUSTOMIZATION */}
      {showAddModal && isAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-stone-900 w-full max-w-xl rounded-3xl border border-amber-200 dark:border-stone-800 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            
            <div className="px-6 py-4 border-b border-amber-100 dark:border-stone-800 flex justify-between items-center bg-amber-50/50 dark:bg-stone-800/50">
              <h4 className="font-bold text-amber-900 dark:text-amber-200">
                {modalType === 'branch' ? t.branchTitle :
                 modalType === 'links' ? t.updateLinks :
                 modalType === 'customize' ? t.customizeModalTitle :
                 editingItem ? t.saveChanges : t.addNew}
              </h4>
              <button onClick={() => setShowAddModal(false)} className="text-stone-400 hover:text-stone-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* CUSTOMIZATION FORM */}
            {modalType === 'customize' && (
              <form onSubmit={handleSaveCustomization} className="p-6 space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">{t.mainTitleLabel}</label>
                  <input
                    type="text"
                    value={tempSiteTitle}
                    onChange={(e) => setTempSiteTitle(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-amber-200 dark:border-stone-700 bg-amber-50/20 dark:bg-stone-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">{t.categoriesLabel}</label>
                  <input
                    type="text"
                    value={tempCategoriesInput}
                    onChange={(e) => setTempCategoriesInput(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-amber-200 dark:border-stone-700 bg-amber-50/20 dark:bg-stone-800"
                  />
                </div>
                <div className="pt-4 flex justify-end">
                  <button type="submit" className="px-5 py-2 rounded-xl bg-amber-800 text-white font-bold">
                    {t.saveCustomization}
                  </button>
                </div>
              </form>
            )}

            {/* BRANCH EDIT FORM */}
            {modalType === 'branch' && (
              <form onSubmit={handleSaveBranch} className="p-6 space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">اسم الفرع (بالعربية)</label>
                  <input
                    type="text"
                    required
                    placeholder={t.branchNamePlaceholder}
                    value={newBranch.name.ar}
                    onChange={(e) => setNewBranch({ ...newBranch, name: { ...newBranch.name, ar: e.target.value } })}
                    className="w-full p-2.5 rounded-xl border border-amber-200 dark:border-stone-700 bg-amber-50/20 dark:bg-stone-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">Branch Name (English)</label>
                  <input
                    type="text"
                    placeholder="e.g., Acre Descendants Branch"
                    value={newBranch.name.en}
                    onChange={(e) => setNewBranch({ ...newBranch, name: { ...newBranch.name, en: e.target.value } })}
                    className="w-full p-2.5 rounded-xl border border-amber-200 dark:border-stone-700 bg-amber-50/20 dark:bg-stone-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">وصف الفرع (بالعربية)</label>
                  <input
                    type="text"
                    placeholder={t.branchDescPlaceholder}
                    value={newBranch.description.ar}
                    onChange={(e) => setNewBranch({ ...newBranch, description: { ...newBranch.description, ar: e.target.value } })}
                    className="w-full p-2.5 rounded-xl border border-amber-200 dark:border-stone-700 bg-amber-50/20 dark:bg-stone-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">Branch Description (English)</label>
                  <input
                    type="text"
                    placeholder="e.g., The new generation of the family living in Jerusalem"
                    value={newBranch.description.en}
                    onChange={(e) => setNewBranch({ ...newBranch, description: { ...newBranch.description, en: e.target.value } })}
                    className="w-full p-2.5 rounded-xl border border-amber-200 dark:border-stone-700 bg-amber-50/20 dark:bg-stone-800"
                  />
                </div>
                <div className="pt-4 flex justify-end">
                  <button type="submit" className="px-5 py-2 rounded-xl bg-amber-800 text-white font-bold">
                    {t.saveBranch}
                  </button>
                </div>
              </form>
            )}

            {/* STORY EDIT FORM */}
            {modalType === 'story' && (
              <form onSubmit={handleSaveStory} className="p-6 space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">عنوان القصة (عربي)</label>
                  <input
                    type="text"
                    required
                    value={editingItem ? (editingItem.title.ar || '') : newStory.title.ar}
                    onChange={(e) => editingItem ? setEditingItem({...editingItem, title: {...editingItem.title, ar: e.target.value}}) : setNewStory({ ...newStory, title: { ...newStory.title, ar: e.target.value } })}
                    className="w-full p-2.5 rounded-xl border border-amber-200 dark:border-stone-700 bg-amber-50/20 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">Story Title (English)</label>
                  <input
                    type="text"
                    value={editingItem ? (editingItem.title.en || '') : newStory.title.en}
                    onChange={(e) => editingItem ? setEditingItem({...editingItem, title: {...editingItem.title, en: e.target.value}}) : setNewStory({ ...newStory, title: { ...newStory.title, en: e.target.value } })}
                    className="w-full p-2.5 rounded-xl border border-amber-200 dark:border-stone-700 bg-amber-50/20 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">{t.authorLabel} (عربي)</label>
                  <input
                    type="text"
                    required
                    value={editingItem ? (editingItem.author.ar || '') : newStory.author.ar}
                    onChange={(e) => editingItem ? setEditingItem({...editingItem, author: {...editingItem.author, ar: e.target.value}}) : setNewStory({ ...newStory, author: { ...newStory.author, ar: e.target.value } })}
                    className="w-full p-2.5 rounded-xl border border-amber-200 dark:border-stone-700 bg-amber-50/20 dark:bg-stone-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">Author / Narrator (English)</label>
                  <input
                    type="text"
                    value={editingItem ? (editingItem.author.en || '') : newStory.author.en}
                    onChange={(e) => editingItem ? setEditingItem({...editingItem, author: {...editingItem.author, en: e.target.value}}) : setNewStory({ ...newStory, author: { ...newStory.author, en: e.target.value } })}
                    className="w-full p-2.5 rounded-xl border border-amber-200 dark:border-stone-700 bg-amber-50/20 dark:bg-stone-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">{t.selectBranchLabel}</label>
                  <select
                    value={editingItem ? (editingItem.branchId || 'b1') : newStory.branchId}
                    onChange={(e) => editingItem ? setEditingItem({...editingItem, branchId: e.target.value}) : setNewStory({ ...newStory, branchId: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-amber-200 dark:border-stone-700 bg-amber-50/20 dark:bg-stone-800"
                  >
                    {branches.filter(b => b.id !== 'all').map(b => (
                      <option key={b.id} value={b.id}>{typeof b.name === 'object' ? (b.name[lang] || b.name.ar) : b.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">{t.storyContentLabel} (عربي)</label>
                  <textarea
                    rows={4}
                    required
                    value={editingItem ? (editingItem.content.ar || '') : newStory.content.ar}
                    onChange={(e) => editingItem ? setEditingItem({...editingItem, content: {...editingItem.content, ar: e.target.value}}) : setNewStory({ ...newStory, content: { ...newStory.content, ar: e.target.value } })}
                    className="w-full p-2.5 rounded-xl border border-amber-200 dark:border-stone-700 bg-amber-50/20 dark:bg-stone-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">Story Content (English)</label>
                  <textarea
                    rows={4}
                    value={editingItem ? (editingItem.content.en || '') : newStory.content.en}
                    onChange={(e) => editingItem ? setEditingItem({...editingItem, content: {...editingItem.content, en: e.target.value}}) : setNewStory({ ...newStory, content: { ...newStory.content, en: e.target.value } })}
                    className="w-full p-2.5 rounded-xl border border-amber-200 dark:border-stone-700 bg-amber-50/20 dark:bg-stone-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">صورة القصة (اختر من الجهاز)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => editingItem ? handleEditingItemFileUpload(e, 'image') : handleFileUpload(e, 'image', setNewStory)}
                    className="w-full p-2 rounded-xl border border-amber-200 dark:border-stone-700 bg-amber-50/20 dark:bg-stone-800 text-xs text-stone-700 dark:text-stone-300 file:mr-4 file:py-1 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-amber-700 file:text-white hover:file:bg-amber-800"
                  />
                  {(editingItem?.image || newStory.image) && (
                    <div className="mt-2 h-24 w-40 rounded-lg overflow-hidden border border-amber-300">
                      <img src={editingItem ? editingItem.image : newStory.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div className="pt-4 flex justify-end">
                  <button type="submit" className="px-5 py-2 rounded-xl bg-amber-800 text-white font-bold">
                    {t.saveChanges}
                  </button>
                </div>
              </form>
            )}

            {/* PHOTO ADD / EDIT FORM */}
            {modalType === 'photo' && (
              <form onSubmit={handleSavePhoto} className="p-6 space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">عنوان الصورة (عربي)</label>
                  <input
                    type="text"
                    required
                    value={editingItem ? (editingItem.title.ar || '') : newPhotoItem.title.ar}
                    onChange={(e) => editingItem ? setEditingItem({...editingItem, title: {...editingItem.title, ar: e.target.value}}) : setNewPhotoItem({ ...newPhotoItem, title: { ...newPhotoItem.title, ar: e.target.value } })}
                    className="w-full p-2.5 rounded-xl border border-amber-200 dark:border-stone-700 bg-amber-50/20 dark:bg-stone-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">Photo Title (English)</label>
                  <input
                    type="text"
                    value={editingItem ? (editingItem.title.en || '') : newPhotoItem.title.en}
                    onChange={(e) => editingItem ? setEditingItem({...editingItem, title: {...editingItem.title, en: e.target.value}}) : setNewPhotoItem({ ...newPhotoItem, title: { ...newPhotoItem.title, en: e.target.value } })}
                    className="w-full p-2.5 rounded-xl border border-amber-200 dark:border-stone-700 bg-amber-50/20 dark:bg-stone-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">وصف الصورة (عربي)</label>
                  <textarea
                    rows={3}
                    value={editingItem ? (editingItem.description?.ar || '') : newPhotoItem.description.ar}
                    onChange={(e) => editingItem ? setEditingItem({...editingItem, description: {...editingItem.description, ar: e.target.value}}) : setNewPhotoItem({ ...newPhotoItem, description: { ...newPhotoItem.description, ar: e.target.value } })}
                    className="w-full p-2.5 rounded-xl border border-amber-200 dark:border-stone-700 bg-amber-50/20 dark:bg-stone-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">اختر الصورة من الجهاز</label>
                  <input
                    type="file"
                    accept="image/*"
                    required={!editingItem}
                    onChange={(e) => editingItem ? handleEditingItemFileUpload(e, 'url') : handleFileUpload(e, 'url', setNewPhotoItem)}
                    className="w-full p-2 rounded-xl border border-amber-200 dark:border-stone-700 bg-amber-50/20 dark:bg-stone-800 text-xs text-stone-700 dark:text-stone-300 file:mr-4 file:py-1 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-amber-700 file:text-white hover:file:bg-amber-800"
                  />
                  {(editingItem?.url || newPhotoItem.url) && (
                    <div className="mt-2 h-28 w-44 rounded-lg overflow-hidden border border-amber-300">
                      <img src={editingItem ? editingItem.url : newPhotoItem.url} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
                <div className="pt-4 flex justify-end">
                  <button type="submit" className="px-5 py-2 rounded-xl bg-amber-800 text-white font-bold">
                    {t.saveChanges}
                  </button>
                </div>
              </form>
            )}

            {/* MEMBER ADD / EDIT FORM */}
            {modalType === 'member' && (
              <form onSubmit={handleSaveMember} className="p-6 space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">{t.fullNameLabel} (عربي)</label>
                  <input
                    type="text"
                    required
                    value={editingItem ? (editingItem.name.ar || '') : newMemberItem.name.ar}
                    onChange={(e) => editingItem
                      ? setEditingItem({ ...editingItem, name: { ...editingItem.name, ar: e.target.value } })
                      : setNewMemberItem({ ...newMemberItem, name: { ...newMemberItem.name, ar: e.target.value } })
                    }
                    className="w-full p-2.5 rounded-xl border border-amber-200 dark:border-stone-700 bg-amber-50/20 dark:bg-stone-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">Full Name (English)</label>
                  <input
                    type="text"
                    value={editingItem ? (editingItem.name.en || '') : newMemberItem.name.en}
                    onChange={(e) => editingItem
                      ? setEditingItem({ ...editingItem, name: { ...editingItem.name, en: e.target.value } })
                      : setNewMemberItem({ ...newMemberItem, name: { ...newMemberItem.name, en: e.target.value } })
                    }
                    className="w-full p-2.5 rounded-xl border border-amber-200 dark:border-stone-700 bg-amber-50/20 dark:bg-stone-800"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">{t.selectBranchLabel}</label>
                    <select
                      value={editingItem ? (editingItem.branchId || 'b1') : newMemberItem.branchId}
                      onChange={(e) => editingItem
                        ? setEditingItem({ ...editingItem, branchId: e.target.value })
                        : setNewMemberItem({ ...newMemberItem, branchId: e.target.value })
                      }
                      className="w-full p-2.5 rounded-xl border border-amber-200 dark:border-stone-700 bg-amber-50/20 dark:bg-stone-800"
                    >
                      {branches.filter(b => b.id !== 'all').map(b => (
                        <option key={b.id} value={b.id}>
                          {typeof b.name === 'object' ? (b.name[lang] || b.name.ar) : b.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">{t.birthYearLabel}</label>
                    <input
                      type="text"
                      placeholder="1950"
                      value={editingItem ? (editingItem.birthYear || '') : newMemberItem.birthYear}
                      onChange={(e) => editingItem
                        ? setEditingItem({ ...editingItem, birthYear: e.target.value })
                        : setNewMemberItem({ ...newMemberItem, birthYear: e.target.value })
                      }
                      className="w-full p-2.5 rounded-xl border border-amber-200 dark:border-stone-700 bg-amber-50/20 dark:bg-stone-800"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">{t.roleLabel} (عربي)</label>
                  <input
                    type="text"
                    value={editingItem ? (editingItem.role?.ar || '') : newMemberItem.role.ar}
                    onChange={(e) => editingItem
                      ? setEditingItem({ ...editingItem, role: { ...editingItem.role, ar: e.target.value } })
                      : setNewMemberItem({ ...newMemberItem, role: { ...newMemberItem.role, ar: e.target.value } })
                    }
                    className="w-full p-2.5 rounded-xl border border-amber-200 dark:border-stone-700 bg-amber-50/20 dark:bg-stone-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">Role / Title (English)</label>
                  <input
                    type="text"
                    value={editingItem ? (editingItem.role?.en || '') : newMemberItem.role.en}
                    onChange={(e) => editingItem
                      ? setEditingItem({ ...editingItem, role: { ...editingItem.role, en: e.target.value } })
                      : setNewMemberItem({ ...newMemberItem, role: { ...newMemberItem.role, en: e.target.value } })
                    }
                    className="w-full p-2.5 rounded-xl border border-amber-200 dark:border-stone-700 bg-amber-50/20 dark:bg-stone-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">النبذة والسيرة الذاتية (عربي)</label>
                  <textarea
                    rows={3}
                    value={editingItem ? (editingItem.bio?.ar || '') : newMemberItem.bio.ar}
                    onChange={(e) => editingItem
                      ? setEditingItem({ ...editingItem, bio: { ...editingItem.bio, ar: e.target.value } })
                      : setNewMemberItem({ ...newMemberItem, bio: { ...newMemberItem.bio, ar: e.target.value } })
                    }
                    className="w-full p-2.5 rounded-xl border border-amber-200 dark:border-stone-700 bg-amber-50/20 dark:bg-stone-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">Bio / Description (English)</label>
                  <textarea
                    rows={3}
                    value={editingItem ? (editingItem.bio?.en || '') : newMemberItem.bio.en}
                    onChange={(e) => editingItem
                      ? setEditingItem({ ...editingItem, bio: { ...editingItem.bio, en: e.target.value } })
                      : setNewMemberItem({ ...newMemberItem, bio: { ...newMemberItem.bio, en: e.target.value } })
                    }
                    className="w-full p-2.5 rounded-xl border border-amber-200 dark:border-stone-700 bg-amber-50/20 dark:bg-stone-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">الصورة الشخصية (اختر من الجهاز)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => editingItem
                      ? handleEditingItemFileUpload(e, 'photo')
                      : handleFileUpload(e, 'photo', setNewMemberItem)
                    }
                    className="w-full p-2 rounded-xl border border-amber-200 dark:border-stone-700 bg-amber-50/20 dark:bg-stone-800 text-xs text-stone-700 dark:text-stone-300 file:mr-4 file:py-1 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-amber-700 file:text-white hover:file:bg-amber-800"
                  />
                  {(editingItem?.photo || newMemberItem.photo) && (
                    <div className="mt-2 w-16 h-16 rounded-full overflow-hidden border border-amber-300">
                      <img src={editingItem ? editingItem.photo : newMemberItem.photo} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
                <div className="pt-4 flex justify-end">
                  <button type="submit" className="px-5 py-2 rounded-xl bg-amber-800 text-white font-bold">
                    {t.saveChanges}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="mt-16 border-t border-amber-200/60 dark:border-stone-800 py-8 text-center text-xs text-stone-500 bg-amber-100/30 dark:bg-stone-900/50">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} {t.footerText}</p>
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            {socialLinks.whatsapp && <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600">WhatsApp</a>}
            {socialLinks.facebook && <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">Facebook</a>}
            {socialLinks.donate && <a href={socialLinks.donate} target="_blank" rel="noopener noreferrer" className="hover:text-rose-600 font-bold">Fund/Donate</a>}
          </div>
        </div>
      </footer>

    </div>
  );
}