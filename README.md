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
    NEXT_PUBLIC_FIREBASE_API_KEY="4"
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=""
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=""
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=""
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=""
    NEXT_PUBLIC_FIREBASE_APP_ID=""
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
    ```

## Çalıştırma

Uygulamayı geliştirme modunda başlatmak için:

```bash
npm run dev
```

Uygulama `http://localhost:3000` adresinde çalışacaktır. 
