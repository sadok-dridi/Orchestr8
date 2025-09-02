import React from "react";

/**
 * Avatar — tiny reusable subcomponent
 * Props:
 *  - src (string): image URL
 *  - alt (string): accessible alternative text
 *  - size (number|string): pixel size or any CSS size (default 96)
 */
function Avatar({ src, alt = "", size = 96 }) {
    const dimension = typeof size === "number" ? `${size}px` : size;
    return (
        <img
            src={src}
            alt={alt}
            width={dimension}
            height={dimension}
            className="mx-auto rounded-full ring-2 ring-black/5 shadow"
        />
    );
}

/**
 * ProfileCard — presentational component
 *
 * Props (read-only):
 *  - name (string): person's display name
 *  - bio (string): short bio
 *  - imageUrl (string): profile image url
 *
 * Note: This component is purely presentational (aka "dumb" component).
 * It simply takes props and renders UI — no state, no side effects.
 */
function ProfileCard({ name = "Anonymous", bio = "No bio yet.", imageUrl }) {
    return (
        <article className="max-w-sm mx-auto bg-white rounded-2xl shadow p-6 text-center space-y-3 select-none">
            <Avatar src={imageUrl} alt={`${name}'s photo`} size={112} />
            <h2 className="text-xl font-semibold tracking-tight">{name}</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{bio}</p>
        </article>
    );
}

// Demo App — parent component that passes hardcoded props to <ProfileCard />
export default function App() {
    const sarah = {
        name: "Sarah",
        bio: "Frontend Developer",
        imageUrl: "https://i.pravatar.cc/300?img=47",
    };

    // You can create more cards by passing different props:
    const alex = {
        name: "Alex",
        bio: "UI/UX Enthusiast",
        imageUrl: "https://i.pravatar.cc/300?img=13",
    };

    return (
        <main className="min-h-screen bg-gray-50 p-8">
            <h1 className="text-2xl font-bold mb-6 text-center">Static Profile Card</h1>

            <div className="grid gap-6 sm:grid-cols-2 place-items-center">
                {/* The key idea: pass hardcoded data down as props */}
                <ProfileCard {...sarah} />
                <ProfileCard {...alex} />
            </div>

            {/* Try it: duplicate <ProfileCard /> calls with different props to see reusability */}
        </main>
    );
}

// Exporting components is how you reuse them in other files too (not needed in this single-file demo)
export { ProfileCard, Avatar };
