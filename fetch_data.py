import requests
from datetime import datetime

# API URLs
IW_sports = "https://whalebettor.com/api/v2/CK%20Sports/Tips/API"
IW_racing = "https://whalebettor.com/api/v2/CK%20Racing/CK%20Tips/API"
IW_JumpOuts = "https://whalebettor.com/api/v2/The%20Jump%20Outs/Tips/"

def fetch_data(api_url, output_file):
    try:
        response = requests.get(api_url)
        response.raise_for_status()
        data = response.json()

        today = datetime.datetime.now().date()
        text_output = ["📅 Today's Bets 📅\n"]
        
        for game in data:
            try:
                game_date = datetime.strptime(game['date'], "%Y-%m-%dT%H:%M:%S.%fZ").date()
                if game_date != today:
                    continue

                # Game header
                text_output.append(f"🎮 Game: {game.get('game', 'N/A')}")
                text_output.append(f"⏰ Time: {datetime.strptime(game['date'], '%Y-%m-%dT%H:%M:%S.%fZ').strftime('%H:%M UTC')}")
                text_output.append(f"📋 Type: {game.get('type', 'N/A')}\n")

                # Detailed bets section
                text_output.append("🔍 Bet Details:")
                for i, bet in enumerate(game.get('bets', []), 1):
                    bet_text = [
                        f"{i}. {bet.get('details', 'No details available')}",
                        f"   🏷️ Bookmaker: {bet.get('bookie', {}).get('name', 'Unknown')}",
                        f"   📍 Location: {bet.get('bookie', {}).get('location', 'N/A')}",
                        f"   🎲 Odds: {bet.get('odds', 'N/A')}",
                        f"   💰 Amount: ${bet.get('amount', 0)}",
                        f"   🔗 Bookie Link: {bet.get('bookie', {}).get('home', 'No link available')}"
                    ]
                    text_output.append("\n".join(bet_text))

                # Promos section
                if game.get('promos'):
                    text_output.append("\n🎁 Active Promotions:")
                    for promo in game['promos']:
                        text_output.append(f"• {promo.get('promo', 'No promo text')}")
                        text_output.append(f"  🔗 {promo.get('bookie', {}).get('promos', 'No promo link')}")

                # Outcomes section
                text_output.append("\n📈 Potential Outcomes:")
                for outcome in game.get('outcomes', []):
                    profit = outcome.get('profit', 0)
                    text_output.append(f"▫️ {outcome.get('condition', 'Condition not specified')}: "
                                     f"[{'Profit' if profit >= 0 else 'Loss'} ${abs(profit)}]")

                text_output.append("\n" + "═"*60 + "\n")

            except KeyError as e:
                print(f"Skipping game with missing field: {e}")
                continue

        if len(text_output) == 1:
            text_output.append("No bets available for today 🏖️")

        with open(output_file, "w", encoding="utf-8") as file:
            file.write("\n".join(text_output))

        print(f"Successfully generated detailed report: {output_file}")

    except Exception as e:
        print(f"Error: {str(e)}")

# Example usage
fetch_data(IW_sports, "detailed_todays_bets.txt")