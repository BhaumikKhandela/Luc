import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="border-t border-zinc-200 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <h3 className="text-xl font-bold mb-4">Opal</h3>
          <p className="text-sm text-zinc-600 max-w-xs">
            Opal is the fastest way to communicate with video. Record your screen and camera to share instantly.
          </p>
        </div>

        {/* Product */}
        <div>
          <h4 className="font-semibold mb-4">Product</h4>
          <ul className="space-y-2 text-sm text-zinc-600">
            <li><Link href="#">Features</Link></li>
            <li><Link href="#">Use cases</Link></li>
            <li><Link href="#">Pricing</Link></li>
            <li><Link href="#">Security</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-zinc-600">
            <li><Link href="#">About</Link></li>
            <li><Link href="#">Careers</Link></li>
            <li><Link href="#">Blog</Link></li>
            <li><Link href="#">Press</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-semibold mb-4">Resources</h4>
          <ul className="space-y-2 text-sm text-zinc-600">
            <li><Link href="#">Help Center</Link></li>
            <li><Link href="#">Community</Link></li>
            <li><Link href="#">Developers</Link></li>
            <li><Link href="#">Contact</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} Opal, Inc. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-zinc-500">
            <Link href="#">Privacy</Link>
            <Link href="#">Terms</Link>
            <Link href="#">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
