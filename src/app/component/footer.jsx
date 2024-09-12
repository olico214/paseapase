export default function Footer({ sesion }) {
    return (
        <footer className="py-6 text-white bg-violet-500">
            <div className="container mx-auto text-center">
                <p className="mb-4 text-sm">
                    <span className="block sm:inline">All rights reserved.</span>
                    <span className="mx-2">&middot;</span>
                    <a
                        className="inline-block text-teal-500 underline transition hover:text-teal-400"
                        href="/terms"
                    >
                        Terms & Conditions
                    </a>
                    <span className="mx-2">&middot;</span>
                    <a
                        className="inline-block text-teal-500 underline transition hover:text-teal-400"
                        href="/privacy"
                    >
                        Privacy Policy
                    </a>
                </p>
                <p className="text-sm text-white">
                    &copy; 2024 {sesion}
                </p>
            </div>
        </footer>
    );
}