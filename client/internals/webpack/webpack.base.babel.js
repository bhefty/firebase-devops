/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');
const dotenv = require(`dotenv`);
const fs = require(`fs`);

if (process.env.CUSTOM_DOTENV) {
  // Load specific env file from `internals/env`
  const envPath = path.join(
    process.cwd(),
    `internals/env/.${process.env.FIREBASE_ENV}.env`,
  );

  // Verify the file exists
  fs.access(envPath, fs.F_OK, err => {
    if (err) throw new Error(err);
  });

  dotenv.config({
    path: envPath,
  });
} else {
  // Default to root `.env`
  dotenv.config();
}

module.exports = options => ({
  mode: options.mode,
  entry: options.entry,
  output: Object.assign(
    {
      // Compile into js/build.js
      path: path.resolve(process.cwd(), 'build'),
      publicPath: '/',
    },
    options.output,
  ), // Merge with env dependent settings
  optimization: options.optimization,
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Transform all .js and .jsx files required somewhere with Babel
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: options.babelQuery,
        },
      },
      {
        // Preprocess our own .css files
        // This is the place to add your own loaders (e.g. sass/less etc.)
        // for a list of loaders, see https://webpack.js.org/loaders/#styling
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        // Preprocess 3rd party .css files located in node_modules
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        use: 'file-loader',
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              // Inline files smaller than 10 kB
              limit: 10 * 1024,
              noquotes: true,
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // Inline files smaller than 10 kB
              limit: 10 * 1024,
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                enabled: false,
                // NOTE: mozjpeg is disabled as it causes errors in some Linux environments
                // Try enabling it in your environment by switching the config to:
                // enabled: true,
                // progressive: true,
              },
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.(mp4|webm)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      },
    ],
  },
  plugins: options.plugins.concat([
    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; Terser will automatically
    // drop any unreachable code.
    new webpack.EnvironmentPlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      NODE_PATH: JSON.stringify(process.env.NODE_PATH),
      ENABLE_TUNNEL: JSON.stringify(process.env.ENABLE_TUNNEL),
      TUNNEL_CLIENT_URL: JSON.stringify(process.env.TUNNEL_CLIENT_URL),
      TUNNEL_SERVER_URL: JSON.stringify(process.env.TUNNEL_SERVER_URL),
      MC_JWT_SECRET: JSON.stringify(process.env.MC_JWT_SECRET),
      MC_PUBLIC_KEY: JSON.stringify(process.env.MC_PUBLIC_KEY),
      ENCRYPT_PUBLIC_KEY: JSON.stringify(process.env.ENCRYPT_PUBLIC_KEY),
      LOGROCKET_INIT_KEY: JSON.stringify(process.env.LOGROCKET_INIT_KEY),
      AUTH0_CLIENT_ID: JSON.stringify(process.env.AUTH0_CLIENT_ID),
      AUTH0_CLIENT_DOMAIN: JSON.stringify(process.env.AUTH0_CLIENT_DOMAIN),
      AUTH0_AUDIENCE: JSON.stringify(process.env.AUTH0_AUDIENCE),
      AUTH0_REDIRECT: JSON.stringify(process.env.AUTH0_REDIRECT),
      AUTH0_SCOPE: JSON.stringify(process.env.AUTH0_SCOPE),
      AUTH0_REALM: JSON.stringify(process.env.AUTH0_REALM),
      FCM_VAPID_KEY: JSON.stringify(process.env.FCM_VAPID_KEY),
      FIREBASE_ENV: JSON.stringify(process.env.FIREBASE_ENV),
      FIREBASE_FUNCTIONS_DOMAIN: JSON.stringify(
        process.env.FIREBASE_FUNCTIONS_DOMAIN,
      ),
      FIREBASE_CONFIG_API_KEY: JSON.stringify(
        process.env.FIREBASE_CONFIG_API_KEY,
      ),
      FIREBASE_CONFIG_AUTH_DOMAIN: JSON.stringify(
        process.env.FIREBASE_CONFIG_AUTH_DOMAIN,
      ),
      FIREBASE_CONFIG_DATABASE_URL: JSON.stringify(
        process.env.FIREBASE_CONFIG_DATABASE_URL,
      ),
      FIREBASE_CONFIG_PROJECT_ID: JSON.stringify(
        process.env.FIREBASE_CONFIG_PROJECT_ID,
      ),
      FIREBASE_CONFIG_STORAGE_BUCKET: JSON.stringify(
        process.env.FIREBASE_CONFIG_STORAGE_BUCKET,
      ),
      FIREBASE_CONFIG_MESSAGING_SENDER_ID: JSON.stringify(
        process.env.FIREBASE_CONFIG_MESSAGING_SENDER_ID,
      ),
      FIREBASE_CONFIG_APP_ID: JSON.stringify(
        process.env.FIREBASE_CONFIG_APP_ID,
      ),
      APP_ROOT_URL: JSON.stringify(process.env.APP_ROOT_URL),
      STRIPE_API_KEY: JSON.stringify(process.env.STRIPE_API_KEY),
      GA_ID: JSON.stringify(process.env.GA_ID),
      STRIPE_COUPON_FREE_TRIAL: JSON.stringify(
        process.env.STRIPE_COUPON_FREE_TRIAL,
      ),
      STRIPE_SUB_COMMERCIAL_RESIDENTIAL_PRODUCT_ID: JSON.stringify(
        process.env.STRIPE_SUB_COMMERCIAL_RESIDENTIAL_PRODUCT_ID,
      ),
      STRIPE_SUB_COMMERCIAL_RESIDENTIAL_PLAN_1: JSON.stringify(
        process.env.STRIPE_SUB_COMMERCIAL_RESIDENTIAL_PLAN_1,
      ),
      STRIPE_SUB_COMMERCIAL_RESIDENTIAL_PLAN_2: JSON.stringify(
        process.env.STRIPE_SUB_COMMERCIAL_RESIDENTIAL_PLAN_2,
      ),
      STRIPE_SUB_COMMERCIAL_RESIDENTIAL_PLAN_3: JSON.stringify(
        process.env.STRIPE_SUB_COMMERCIAL_RESIDENTIAL_PLAN_3,
      ),
      CLOUDINARY_CLOUD_NAME: JSON.stringify(process.env.CLOUDINARY_CLOUD_NAME),
      CLOUDINARY_UPLOAD_BUILDING_IMAGES: JSON.stringify(
        process.env.CLOUDINARY_UPLOAD_BUILDING_IMAGES,
      ),
      CLOUDINARY_UPLOAD_AVATAR: JSON.stringify(
        process.env.CLOUDINARY_UPLOAD_AVATAR,
      ),
      STRIPE_CLIENT_ID: JSON.stringify(process.env.STRIPE_CLIENT_ID),
      STRIPE_REDIRECT_URI: JSON.stringify(process.env.STRIPE_REDIRECT_URI),
      STRIPE_SUB_CONNECT_FEE_PRODUCT_ID: JSON.stringify(
        process.env.STRIPE_SUB_CONNECT_FEE_PRODUCT_ID,
      ),
      STRIPE_SUB_CONNECT_FEE_PLAN_ID: JSON.stringify(
        process.env.STRIPE_SUB_CONNECT_FEE_PLAN_ID,
      ),
      TWILIO_MESSAGE_SERVICE_RENTMINDME_NOTIFICATIONS: JSON.stringify(
        process.env.TWILIO_MESSAGE_SERVICE_RENTMINDME_NOTIFICATIONS,
      ),
      TWILIO_NOTIFY_RENTMINDME_NOTIFICATIONS: JSON.stringify(
        process.env.TWILIO_NOTIFY_RENTMINDME_NOTIFICATIONS,
      ),
      TEST_ENV: JSON.stringify(process.env.TEST_ENV),
      USE_FUNCTIONS_EMULATOR: JSON.stringify(
        process.env.USE_FUNCTIONS_EMULATOR,
      ),
    }),
  ]),
  resolve: {
    modules: ['node_modules', 'app'],
    extensions: ['.js', '.jsx', '.react.js'],
    mainFields: ['browser', 'jsnext:main', 'main'],
  },
  devtool: options.devtool,
  target: 'web', // Make web variables accessible to webpack, e.g. window
  performance: options.performance || {},
});
