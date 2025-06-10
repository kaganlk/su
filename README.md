# Next.js Firebase Uygulaması

Bu proje, Firebase ile entegre edilmiş bir Next.js uygulamasıdır.

## Kurulum

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

1.  Depoyu klonlayın:

    ```bash
    git clone <depo-url>
    cd <proje-klasörü>
    ```

2.  Bağımlılıkları yükleyin:

    ```bash
    npm install
    ```

3.  Firebase yapılandırma dosyasını oluşturun.
    Firebase projenizin ayarlarından (Proje ayarları > Uygulamalarınız > Web uygulaması > Yapılandırma) aşağıdaki bilgileri alarak projenizin kök dizininde `.env.local` adında bir dosya oluşturun ve içine ekleyin:

    ```
    NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSyBGu6IVqx08pji4EWIDKwxHY-utYtygOP4"
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="hackathon3-befd8.firebaseapp.com"
    NEXT_PUBLIC_FIREBASE_PROJECT_ID="hackathon3-befd8"
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="hackathon3-befd8.firebasestorage.app"
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="91164209799"
    NEXT_PUBLIC_FIREBASE_APP_ID="1:91164209799:web:6dd9d95896fe912a3e7e22"
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
    ```

## Çalıştırma

Uygulamayı geliştirme modunda başlatmak için:

```bash
npm run dev
```

Uygulama `http://localhost:3000` adresinde çalışacaktır. 