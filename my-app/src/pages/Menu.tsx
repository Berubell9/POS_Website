import Card from "../components/Card";
import CurrentOrder from "../components/CurrentOrder";

export default function Menu() {
    return (
        <div className="h-screen p-6">
            <CurrentOrder/>
            <h1>Main Content</h1>
            <p>This is where your main content goes.</p>
            <Card/>
        </div>
    )
}