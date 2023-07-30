
/**
 * Local storage keys
 */
export default class MemoryKeys {

    /**
     * Storage key for cart items
     */
    static UserToken = `${process.env.APP_NAME}-cart`;

    /**
     * Storage key for products
     */
    static Courses = `${process.env.APP_NAME}-products`;

    /**
     * Storage key for user
     */
    static UserCredentials = `${process.env.APP_NAME}-user-credentials`;

    /**
     * Storage key for videos
     */
    static Videos = `${process.env.APP_NAME}-hero-videos`;
}