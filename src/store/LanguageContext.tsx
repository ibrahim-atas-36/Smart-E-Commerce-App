import React from "react";

export const languageOptions = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
  { code: "it", label: "Italiano" },
  { code: "pt", label: "Português" },
  { code: "de", label: "Deutsch" },
  { code: "tr", label: "Türkçe" },
] as const;

export type LanguageCode = (typeof languageOptions)[number]["code"];

type TranslationKey =
  | "account"
  | "profileSettings"
  | "preferences"
  | "darkMode"
  | "darkModeDescription"
  | "language"
  | "support"
  | "needHelp"
  | "supportDescription"
  | "chooseLanguage"
  | "selectLanguage"
  | "discoverProducts"
  | "findSomething"
  | "yourCart"
  | "cartItems"
  | "cartWaiting"
  | "readyWhen"
  | "discoverSomething"
  | "exploreProducts"
  | "email"
  | "password"
  | "confirmPassword"
  | "rememberMe"
  | "forgotPassword"
  | "login"
  | "signUp"
  | "createAccount"
  | "continueWith"
  | "continueGoogle"
  | "continueApple"
  | "noAccount"
  | "alreadyAccount"
  | "savedFavorites"
  | "addToCart"
  | "addedToCart";

type Translations = Record<TranslationKey, string>;

const translations: Record<LanguageCode, Translations> = {
  en: {
    account: "ACCOUNT",
    profileSettings: "Profile & settings",
    preferences: "PREFERENCES",
    darkMode: "Dark mode",
    darkModeDescription: "Use a darker appearance",
    language: "Language",
    support: "SUPPORT",
    needHelp: "Need help?",
    supportDescription: "We are here for you",
    chooseLanguage: "Choose language",
    selectLanguage: "Select your preferred language",
    discoverProducts: "Discover products",
    findSomething: "Find something you will love",
    yourCart: "Your cart",
    cartItems: "items",
    cartWaiting: "Your cart is waiting",
    readyWhen: "READY WHEN YOU ARE",
    discoverSomething: "Discover something you love and it will appear here.",
    exploreProducts: "Explore products",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    rememberMe: "Remember me",
    forgotPassword: "Forgot Password?",
    login: "Login",
    signUp: "Sign Up",
    createAccount: "Create New Account",
    continueWith: "or continue with",
    continueGoogle: "Continue with Google",
    continueApple: "Continue with Apple",
    noAccount: "Don’t have an account?",
    alreadyAccount: "Already have an account?",
    savedFavorites: "Saved favorites",
    addToCart: "Add to cart",
    addedToCart: "Added to cart",
  },
  fr: {
    account: "COMPTE",
    profileSettings: "Profil et réglages",
    preferences: "PRÉFÉRENCES",
    darkMode: "Mode sombre",
    darkModeDescription: "Utiliser une apparence sombre",
    language: "Langue",
    support: "ASSISTANCE",
    needHelp: "Besoin d’aide ?",
    supportDescription: "Nous sommes là pour vous",
    chooseLanguage: "Choisir la langue",
    selectLanguage: "Sélectionnez votre langue préférée",
    discoverProducts: "Découvrir les produits",
    findSomething: "Trouvez quelque chose que vous aimerez",
    yourCart: "Votre panier",
    cartItems: "articles",
    cartWaiting: "Votre panier vous attend",
    readyWhen: "PRÊT QUAND VOUS L’ÊTES",
    discoverSomething: "Découvrez quelque chose que vous aimerez.",
    exploreProducts: "Découvrir les produits",
    email: "E-mail",
    password: "Mot de passe",
    confirmPassword: "Confirmer le mot de passe",
    rememberMe: "Se souvenir de moi",
    forgotPassword: "Mot de passe oublié ?",
    login: "Connexion",
    signUp: "S’inscrire",
    createAccount: "Créer un compte",
    continueWith: "ou continuer avec",
    continueGoogle: "Continuer avec Google",
    continueApple: "Continuer avec Apple",
    noAccount: "Vous n’avez pas de compte ?",
    alreadyAccount: "Vous avez déjà un compte ?",
    savedFavorites: "Favoris enregistrés",
    addToCart: "Ajouter au panier",
    addedToCart: "Ajouté au panier",
  },
  es: {
    account: "CUENTA",
    profileSettings: "Perfil y ajustes",
    preferences: "PREFERENCIAS",
    darkMode: "Modo oscuro",
    darkModeDescription: "Usar una apariencia más oscura",
    language: "Idioma",
    support: "SOPORTE",
    needHelp: "¿Necesitas ayuda?",
    supportDescription: "Estamos aquí para ayudarte",
    chooseLanguage: "Elegir idioma",
    selectLanguage: "Selecciona tu idioma preferido",
    discoverProducts: "Descubre productos",
    findSomething: "Encuentra algo que te encantará",
    yourCart: "Tu carrito",
    cartItems: "artículos",
    cartWaiting: "Tu carrito está esperando",
    readyWhen: "LISTO CUANDO TÚ LO ESTÉS",
    discoverSomething: "Descubre algo que te guste y aparecerá aquí.",
    exploreProducts: "Explorar productos",
    email: "Correo electrónico",
    password: "Contraseña",
    confirmPassword: "Confirmar contraseña",
    rememberMe: "Recordarme",
    forgotPassword: "¿Olvidaste tu contraseña?",
    login: "Iniciar sesión",
    signUp: "Registrarse",
    createAccount: "Crear una cuenta",
    continueWith: "o continuar con",
    continueGoogle: "Continuar con Google",
    continueApple: "Continuar con Apple",
    noAccount: "¿No tienes una cuenta?",
    alreadyAccount: "¿Ya tienes una cuenta?",
    savedFavorites: "Favoritos guardados",
    addToCart: "Añadir al carrito",
    addedToCart: "Añadido al carrito",
  },
  it: {
    account: "ACCOUNT",
    profileSettings: "Profilo e impostazioni",
    preferences: "PREFERENZE",
    darkMode: "Modalità scura",
    darkModeDescription: "Usa un aspetto più scuro",
    language: "Lingua",
    support: "SUPPORTO",
    needHelp: "Hai bisogno di aiuto?",
    supportDescription: "Siamo qui per te",
    chooseLanguage: "Scegli lingua",
    selectLanguage: "Seleziona la tua lingua preferita",
    discoverProducts: "Scopri i prodotti",
    findSomething: "Trova qualcosa che amerai",
    yourCart: "Il tuo carrello",
    cartItems: "articoli",
    cartWaiting: "Il tuo carrello ti aspetta",
    readyWhen: "PRONTO QUANDO VUOI",
    discoverSomething: "Scopri qualcosa che ami e apparirà qui.",
    exploreProducts: "Esplora prodotti",
    email: "Email",
    password: "Password",
    confirmPassword: "Conferma password",
    rememberMe: "Ricordami",
    forgotPassword: "Password dimenticata?",
    login: "Accedi",
    signUp: "Registrati",
    createAccount: "Crea un account",
    continueWith: "o continua con",
    continueGoogle: "Continua con Google",
    continueApple: "Continua con Apple",
    noAccount: "Non hai un account?",
    alreadyAccount: "Hai già un account?",
    savedFavorites: "Preferiti salvati",
    addToCart: "Aggiungi al carrello",
    addedToCart: "Aggiunto al carrello",
  },
  pt: {
    account: "CONTA",
    profileSettings: "Perfil e configurações",
    preferences: "PREFERÊNCIAS",
    darkMode: "Modo escuro",
    darkModeDescription: "Usar uma aparência escura",
    language: "Idioma",
    support: "SUPORTE",
    needHelp: "Precisa de ajuda?",
    supportDescription: "Estamos aqui para você",
    chooseLanguage: "Escolher idioma",
    selectLanguage: "Selecione seu idioma preferido",
    discoverProducts: "Descubra produtos",
    findSomething: "Encontre algo que você vai amar",
    yourCart: "Seu carrinho",
    cartItems: "itens",
    cartWaiting: "Seu carrinho está esperando",
    readyWhen: "PRONTO QUANDO VOCÊ ESTIVER",
    discoverSomething: "Descubra algo que você ama e verá aqui.",
    exploreProducts: "Explorar produtos",
    email: "E-mail",
    password: "Senha",
    confirmPassword: "Confirmar senha",
    rememberMe: "Lembrar de mim",
    forgotPassword: "Esqueceu a senha?",
    login: "Entrar",
    signUp: "Cadastrar",
    createAccount: "Criar conta",
    continueWith: "ou continuar com",
    continueGoogle: "Continuar com Google",
    continueApple: "Continuar com Apple",
    noAccount: "Não tem uma conta?",
    alreadyAccount: "Já tem uma conta?",
    savedFavorites: "Favoritos salvos",
    addToCart: "Adicionar ao carrinho",
    addedToCart: "Adicionado ao carrinho",
  },
  de: {
    account: "KONTO",
    profileSettings: "Profil und Einstellungen",
    preferences: "EINSTELLUNGEN",
    darkMode: "Dunkler Modus",
    darkModeDescription: "Dunklere Darstellung verwenden",
    language: "Sprache",
    support: "SUPPORT",
    needHelp: "Brauchst du Hilfe?",
    supportDescription: "Wir sind für dich da",
    chooseLanguage: "Sprache auswählen",
    selectLanguage: "Wähle deine bevorzugte Sprache",
    discoverProducts: "Produkte entdecken",
    findSomething: "Finde etwas, das du lieben wirst",
    yourCart: "Dein Warenkorb",
    cartItems: "Artikel",
    cartWaiting: "Dein Warenkorb wartet",
    readyWhen: "BEREIT, WENN DU ES BIST",
    discoverSomething: "Entdecke etwas, das hier erscheinen soll.",
    exploreProducts: "Produkte entdecken",
    email: "E-Mail",
    password: "Passwort",
    confirmPassword: "Passwort bestätigen",
    rememberMe: "Angemeldet bleiben",
    forgotPassword: "Passwort vergessen?",
    login: "Anmelden",
    signUp: "Registrieren",
    createAccount: "Konto erstellen",
    continueWith: "oder weiter mit",
    continueGoogle: "Mit Google fortfahren",
    continueApple: "Mit Apple fortfahren",
    noAccount: "Noch kein Konto?",
    alreadyAccount: "Schon ein Konto?",
    savedFavorites: "Gespeicherte Favoriten",
    addToCart: "In den Warenkorb",
    addedToCart: "Hinzugefügt",
  },
  tr: {
    account: "HESAP",
    profileSettings: "Profil ve ayarlar",
    preferences: "TERCİHLER",
    darkMode: "Karanlık tema",
    darkModeDescription: "Daha koyu bir görünüm kullan",
    language: "Dil",
    support: "DESTEK",
    needHelp: "Yardıma mı ihtiyacın var?",
    supportDescription: "Senin için buradayız",
    chooseLanguage: "Dil seç",
    selectLanguage: "Tercih ettiğin dili seç",
    discoverProducts: "Ürünleri keşfet",
    findSomething: "Seveceğin bir şey bul",
    yourCart: "Sepetin",
    cartItems: "ürün",
    cartWaiting: "Sepetin seni bekliyor",
    readyWhen: "SEN HAZIR OLDUĞUNDA",
    discoverSomething: "Beğeneceğin ürünleri keşfet, burada görünsün.",
    exploreProducts: "Ürünleri keşfet",
    email: "E-posta",
    password: "Şifre",
    confirmPassword: "Şifreyi onayla",
    rememberMe: "Beni hatırla",
    forgotPassword: "Şifreni mi unuttun?",
    login: "Giriş yap",
    signUp: "Kayıt ol",
    createAccount: "Hesap oluştur",
    continueWith: "veya devam et",
    continueGoogle: "Google ile devam et",
    continueApple: "Apple ile devam et",
    noAccount: "Hesabın yok mu?",
    alreadyAccount: "Zaten hesabın var mı?",
    savedFavorites: "Kayıtlı favoriler",
    addToCart: "Sepete ekle",
    addedToCart: "Sepete eklendi",
  },
};

interface LanguageContextValue {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  t: (key: TranslationKey) => string;
}

export const LanguageContext = React.createContext<
  LanguageContextValue | undefined
>(undefined);

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguage] = React.useState<LanguageCode>("en");

  const value = React.useMemo(
    () => ({
      language,
      setLanguage,
      t: (key: TranslationKey) => translations[language][key],
    }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = React.useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
};
