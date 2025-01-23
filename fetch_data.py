import requests
from datetime import datetime
import pytz

# API URLs
IW_sports = "https://whalebettor.com/api/v2/CK%20Sports/Tips/API"
IW_racing = "https://whalebettor.com/api/v2/CK%20Racing/CK%20Tips/API"
IW_JumpOuts = "https://whalebettor.com/api/v2/The%20Jump%20Outs/Tips/"

# Define AEDT timezone
AEDT = pytz.timezone("Australia/Sydney")

def fetch_data(api_url, output_file):
    try:
        response = requests.get(api_url)
        response.raise_for_status()
        data = response.json()

        # Get current AEDT time
        current_aedt = datetime.now(AEDT)
        today = current_aedt.date()
        
        md_content = [
            f"# 📅 Today's Bets - {current_aedt.strftime('%a %d %b %Y')}",
            f"**Current AEDT Time:** {current_aedt.strftime('%I:%M %p')}  \n"
        ]

        for game in data:
            try:
                # Convert game date to AEDT
                game_utc = datetime.strptime(game['date'], "%Y-%m-%dT%H:%M:%S.%fZ").replace(tzinfo=pytz.UTC)
                game_aedt = game_utc.astimezone(AEDT)
                
                if game_aedt.date() != today:
                    continue

                # Game header
                md_content.append(f"## 🏆 {game.get('game', 'N/A')}")
                md_content.append(
                    f"- **Time:** {game_aedt.strftime('%I:%M %p').lstrip('0')} AEDT  \n"
                    f"- **Type:** {game.get('type', 'N/A')}"
                )

                # Bet details
                md_content.append("\n### 💰 Bet Details")
                for i, bet in enumerate(game.get('bets', []), 1):
                    bookie = bet.get('bookie', {})
                    md_content.append(
                        f"{i}. **{bet.get('details', 'No details available')}**  \n"
                        f"   - Bookmaker: {bookie.get('name', 'Unknown')}  \n"
                        f"   - Odds: {bet.get('odds', 'N/A')}  \n"
                        f"   - Stake: ${bet.get('amount', 0)}  \n"
                        f"   - [Bookmaker Site]({bookie.get('home', '#')})"
                    )

                # Promotions
                if game.get('promos'):
                    md_content.append("\n### 🎉 Active Promotions")
                    for promo in game['promos']:
                        bookie = promo.get('bookie', {})
                        md_content.append(
                            f"- {promo.get('promo', 'No promo text')}  \n"
                            f"  [View Promotion]({bookie.get('promos', '#')})"
                        )

                # Outcomes
                md_content.append("\n### 📈 Potential Outcomes")
                for outcome in game.get('outcomes', []):
                    profit = outcome.get('profit', 0)
                    md_content.append(
                        f"- **{outcome.get('condition', 'Condition not specified')}:** "
                        f"`{'▲ Profit' if profit >= 0 else '▼ Loss'} ${abs(profit)}`"
                    )

                md_content.append("\n---\n")

            except (KeyError, ValueError) as e:
                print(f"Skipping entry due to error: {str(e)}")
                continue

        if len(md_content) < 3:
            md_content.append("\n## 🎉 No bets available for today!")

        with open(output_file, "w", encoding="utf-8") as file:
            file.write("\n".join(md_content))

        print(f"Successfully generated Markdown report: {output_file}")

    except Exception as e:
        print(f"Error: {str(e)}")

# Example usage
fetch_data(IW_sports, "todays_bets.md")